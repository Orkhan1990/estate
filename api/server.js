import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.get("/",(req,res)=>{
    res.send("Salam Qaqa necesen?")
})

const port=process.env.PORT||9000;

mongoose.connect(process.env.MONGODB).then(()=>{
console.log("Connected to MongoDB");
}).catch((error)=>console.log(error.message))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})