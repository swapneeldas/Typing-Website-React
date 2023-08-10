const mongoose=require('mongoose');
const mongoURI="mongodb+srv://dasswapneel706:cleo2010!!@cluster0.4nsdq7o.mongodb.net/Typer?retryWrites=true&w=majority";
connectToMongo().catch(err=>console.log(err));

async function connectToMongo(){
    await mongoose.connect(mongoURI);
    console.log("connected to db")
}
module.exports=connectToMongo;