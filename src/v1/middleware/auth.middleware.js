require('dotenv').config();

const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.TOKEN_KEY;

const Token = require('./../../../mongo/models/tokens');
const Api = require('./../../../mongo/models/api');

const helpers = require('./../util/helper.util');


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, async(err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            const existingToken = await Token.findOne({ accessToken: token });
            if (existingToken && existingToken.expires < Date.now()) {
                return res.status(401).json({
                    message: "Token expired",
                    status: 401
                });
            }

            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(401);
    }
};

const authenticateApiKey = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    const key = authHeader.split(' ')[1];
    const hashedKey =  helpers.hash(key);

    try {
        const apiKey = await Api.findOne({ hashedKey });
        if (!apiKey) return res.status(401).json({
            message: "Invalid api key",
            status: 401
        });

        next();
    } catch(e) {
        console.log(e);
        return res.sendStatus(401);
    }


}



module.exports = {
    authenticateJWT,
    authenticateApiKey
};