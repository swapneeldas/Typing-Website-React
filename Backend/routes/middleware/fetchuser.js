var jwt=require('jsonwebtoken');
const jwt_secret="This is secret";

const fetchuser=(req,res,next)=>{
    const token =req.header('authToken');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const data=jwt.verify(token,jwt_secret);
        req.user=data.user;
        next()
    }catch(error){
        res.status(401).send({error:"Please authenticate using a valid token 1"})
    }
}
module.exports=fetchuser;