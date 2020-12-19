const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/signup', async (req,res)=>{
    try {
        const {name, email, password, mobile_no} = req.body;
        if(!name || !email || !password || !mobile_no){
            return res.status(401).json({msg: "Please Enter all the fields"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({msg: "Email Already exists"});
        }

        if(password.length < 6){
            return res.status(401).json({msg: "Password must contain atleast 6 characters"});
        }

        if(!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile_no)){
            return res.status(401).json({msg: "Mobile Number must be of 10 numbers"});
        }   

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(401).json({msg: "Please Enter a valid Email"});
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name, 
            email, 
            password: hashPassword, 
            mobile_no
        })

        await newUser.save();
        res.json({newUser, msg: "User Signed Up Successfully"});
        

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.post('/signin', async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({msg: "Please Enter all the fields"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg: "User does not exists"});
        }

        const doMatch = await bcrypt.compare(password, user.password);
        if(doMatch){
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
            if(token){
                res.json({token});
            }
        }else{
            return res.status(401).json({msg: "Invalid Email or Password"});
        }

    } catch (err) {
        return res.status(401).json({err: err.message});
    }
})

router.get('/getUser', auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user){
            res.json(user);
        }else{
            return res.status(401).json({msg: "User doesnot exists"});
        }
    } catch (err) {
        return res.status(401).json({err: err.message});
    }
})

module.exports = router;