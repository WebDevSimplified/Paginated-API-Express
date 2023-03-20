const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./../../../mongo/models/users');
const Token = require('./../../../mongo/models/tokens');

const helpers = require('./../util/helper.util');

router
    .route('/register')
    /**
     * register with email and password
     */
    .post(async (req, res, _) => {
        const { email, password } = req.body
        try {
            const existingUser = await User.findOne({ email })
            if (existingUser != null) return res.status(409).json({ message: "User with that email already exits", status: 409 });
    
            const encryptedPassword = helpers.hash(password);
            const user = await User.create({
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
                role: "client"
            });
    
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: helpers.generateTokenExpiration() }
            );
            user.token = token;
            return res.status(201).json(user)
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                message: "Something went wrong.",
                status: 500
            })
        }

    });

router
    .route('/login')
    /**
     * login with email and password
     */
    .post(async (req, res, _) => {
        let { email, password } = req.body
        try {
            email = typeof(email) == "string" && email.trim() != "" ? email : false;
            password = typeof(password) == "string" && email.trim() != "" ? password : false;
            if (!(email && password)) return res.status(400).json({
                message: "Invalid credentials",
                status: 400
            });
            let user = await User.findOne({ email });
            const isLoginSuccessful = user && user.password == helpers.hash(password);


            if (!isLoginSuccessful) {
                return res.status(400).json({
                    message: "Invalid credentials",
                    status: 400
                });
            }
            
            const token = helpers.generateToken(user);

            await Token.create({
               accessToken: token,
               expires: helpers.generateTokenExpiration(), 
               userId: user._id
            });

            return res.status(200).json({
                email: user.email,
                role: user.role,
                token: token,
                status: 200,
                message: "Logged in successfully."
            });
    
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                message: "Something went wrong.",
                status: 500
            })  
        }

    });

router
    .route('/token')
    /**
     * Extend the duration of the token
     */
    .post(async (req, res, _) => {
        try {
            const { id, extend } = req.body;
            const token = typeof id == 'Number' ? id : false;
            if (!(token && extend)) res.status(400).json({ message: "Invalid input", status: 400 });
    
            await Token.findOneAndUpdate();
            res.status(200).json({
                message: "Session extended successfully.",
                status: 200
            });

        } catch(err) {
            return res.status(500).json({
                message: "Something went wrong.",
                status: 500
            });
        }
    });

router
.route('/token')
/**
 * Delete the token
 */
.delete(async (req, res, _) => {
    try {
        const { id } = req.body;
        const tokenId= typeof id == 'string' ? id : false;
        if (!tokenId) res.status(400).json({ message: "Invalid input", status: 400 });
    
        await Token.deleteOne({ id: tokenId });
        res.status(200).json({
            message: "Session stopped successfully.",
            status: 200
        });
    } catch(err) {
        return res.status(500).json({
            message: "Something went wrong.",
            status: 500
        }); 
    }
});

   

module.exports = router;