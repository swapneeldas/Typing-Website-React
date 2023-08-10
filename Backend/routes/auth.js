const express=require('express');
const router=express.Router();
const fetchUser=require("./middleware/fetchuser")
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwt_secret="This is secret";
const {body,validationResult}=require('express-validator');
const User = require('../models/user');
router.post('/createuser',[body('Name').isLength({min:3}),
body('password').isLength({min:5})],async (req,res)=>{
   let success=false;
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   try{
    let userdata=await User.findOne({Name:req.body.Name});
    if(userdata){
        return res.status(400).json({error:"Sorry a user with this name already exists"})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    userdata=await User.create({
        Name:req.body.Name,
        password:secPass
    })
    const data={
        user:{
            id:userdata.id
        }
    }
    const authtoken=jwt.sign(data,jwt_secret);
    success=true;
    res.json({success,authtoken});
   }
   catch(error){
    console.error(error.message);
    res.status(500).json({success,message:"Internal Server Error"});
   }
})
router.post('/login',[body('Name').isLength({min:5}),
body('password').exists()],async(req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    const{Name,password}=req.body;
    try{
        let userdata=await User.findOne({Name:Name});
        if(!userdata){
            return res.status(400).json({success,error:"use right credentials to login"})
        }
        const passwordCompare=await bcrypt.compare(password,userdata.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:"use right credentials to login"})
        }
        const data={
            user:{
                id:userdata.id
            }
        }
        const authtoken=jwt.sign(data,jwt_secret);
        success=true;
        res.json({success,authtoken})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

router.post('/getuserdata',fetchUser,async(req,res)=>{
    let success=true;
    try{
        var userId=req.user.id;
        const userdata=await User.findById(userId).select("-password");
        res.status(200).send(userdata); 
    }catch(error){
        console.error(error.message);
        success=false;
        res.status(500).json({error:"Internal Server error",success});
    }
})

module.exports=router;