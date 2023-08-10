connectToMongo=require("./dataBaseConnection/db");
connectToMongo();
const express = require('express')
const cors=require('cors');
const app = express()
app.use(cors());
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/data',require('./routes/datamanipulation'));
app.listen(5000,()=>{
    console.log("server listening at port 5000")
})