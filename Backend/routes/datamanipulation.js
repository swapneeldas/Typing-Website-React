const express=require('express');
const router=express.Router();
const fetchUser=require("./middleware/fetchuser");
const user=require("../models/user");

//update data
router.put('/update',fetchUser,async(req,res)=>{
    let success=false;
    try{
    // const {races,wpm,NoofRaces}=req.body;
    data=await user.findByIdAndUpdate(req.user.id,{$set:{...req.body}},{new:true});
    res.json(data);
}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})
module.exports=router;