const mongoose =require("mongoose");
const {Schema} =mongoose;

const UserSchema=({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    races:{
        type:[[{white:Number,time:Number}]],
    },
    wpm:{
        type:[Number]
    },
    NoofRaces:{
        type:Number,
        default:0
    },
    text:{
        type:[String]
    },
    img:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
    }
})
const User=mongoose.model('user',UserSchema);
// User.createIndexes();
module.exports=User;
