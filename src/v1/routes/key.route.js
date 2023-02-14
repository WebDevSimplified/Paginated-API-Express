const router = require('express').Router();

const { authenticateJWT } = require('../middleware/auth.middleware');
const helpers = require('./../util/helper.util');
const Api = require('./../../../mongo/models/api');

router.
    route('/')
        /**
         * Generate api key
         */
        .get(authenticateJWT, async (req, res, __) => {
            const prefix = "Dfn.";
            const key = helpers.createRandomString(12);
            const apiKey = prefix.concat(key);
            console.log("api key: " + key);
            try {
                const condition = {
                    userId: req.user.id
                };
                const update = {
                    hashedKey: helpers.hash(apiKey),
                    userId: req.user.id
                }
                const options = { upsert: true };
                await Api.findOneAndUpdate(condition, update, options);
            } catch(e) {
                console.log(e);
                return res.status(500).json({
                    message: "Something went wrong",
                    status: 500
                });
            }

            return res.json({
                message: "An API key has been successfully generated",
                key: apiKey, 
                status: 200
            });
        });
    
       
    
    module.exports = router;