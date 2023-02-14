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
                role: role
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
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email });
            const isLoginSuccessful = user && user.password == helpers.hash(password);

            if (!isLoginSuccessful) {
                res.statusCode(400).json({
                    message: "Invalid credentials",
                    status: 400
                });
            }
            
            const token = jwt.sign({ user: user.email, id: user._id, role: user.role }, process.env.TOKEN_KEY);

            await Token.create({
               accessToken: token,
               expires: helpers.generateTokenExpiration(), 
               userId: user._id
            });

            return res.status(200).json({
                email: user.email,
                role: user.role,
                token: token
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
        const { id, extend } = req.body;
        const token = typeof id == 'Number' ? id : false;
        if (!(token && extend)) res.status(400).json({ message: "Invalid input", status: 400 });

        await Token.findOneAndUpdate()
    });

   

module.exports = router;