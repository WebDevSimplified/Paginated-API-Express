const express = require('express');
const router = express.Router();

const User = require('./../../../mongo/models/users');

router
    .route('/register')
    /**
     * login with email and password
     */
    .post(async (req, res, _) => {
        const { email, password } = req.body

        try {
            const existingUser = await User.findOne({ email })
            if (existingUser == null) res.statusCode(409).json({ message: "User with that email already exits", status: 409 });
    
            const encryptedPassword = bcrypt.hash(password);
            const user = await User.create({
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            });
    
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
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
            const user = await User.findOne({ email });
        
            if (await bcrypt.compare(user.password, password)) {
                const token = jwt.sign({ user: user.email }, process.env.SECRET_KEY);
                user.token = token
                return res.statusCode(200).json(user)
            } else {
                res.statusCode(400).json({
                    message: "Invalid credentials",
                    status: 400
                })
            }
    
            return res.json({})
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                message: "Something went wrong.",
                status: 500
            })  
        }

    });

   

module.exports = router;