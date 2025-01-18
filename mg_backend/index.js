const express=require('express')
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const app=express()

const userRoutes= require("./routes/User")

app.use(bodyParser.json()); 

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST , PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    console.log("CORS headers set")
    next();
});

app.use(userRoutes)

mongoose.connect("mongodb+srv://tanishgupta2007:Pasta%40nashta1@cluster0.5kri1.mongodb.net/memegen")
.then(result=>{
    console.log("MongoDB is connected")
    app.listen('8000', () => {
        console.log("Backend is listening at port 8000");
     });
})
.catch(e=> console.log(e)); // error in connecting to mongodb   

