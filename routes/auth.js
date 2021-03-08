const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');
const Joi = require('@hapi/joi');
const {registerValidation, loginValidation } = require('../validators/user');
const jwt = require('jsonwebtoken');



//REGISTER
router.post('/register', async (req, res) => {
    //VALIDATION: TODO
    const validationError = registerValidation(req.body).error;
    if(validationError){
        return res.status(400).json({error: validationError.details[0].message});
    }
    
    //Checking if the user with that email exists;
    const user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).json({error: 'User with this email already exists'});

    //Checking if the user with the nickname exists
    const userNick = await User.findOne({name: req.body.name});
    if(userNick) return res.status(400).json({error: 'User with this nickname already exists'});
    
    //Hashing and sending it to database
    async.waterfall([

        //Generating my salt (secret seed)
        function(callback){
            bcrypt.genSalt(10, (err, result) => {
                err ? callback(err) : callback(null, result);
            });
        },

        //Hashing my password
        function(salt, callback){
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                err ? callback(err) : callback(null, hash);
            })
        },

        //Creating the mongoDB object and sending it to database
        function(hashedPassword, callback){
            const toSend = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            toSend.save(callback);
        }
    ], function(err, result){
        return err ? res.send(err).status(400) : res.send(result);
    });
});

//LOGIN
router.post('/login', async (req,res) => {
    
    //Validation
    const validationError = loginValidation(req.body).error;
    if(validationError){
        return res.status(400).json({error: validationError.details[0].message});
    }

    //Checking if the user with this email actually exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({error: 'User with this email doesn\'t exists'});

    //Checking if the password matches with the one from the database
    const doesPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!doesPasswordMatch) return res.status(400).json({error: 'Invalid password'});

    //Creating the JWT token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    res.header('JWT', token).send(user);

});

module.exports = router;