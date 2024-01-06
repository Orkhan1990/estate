import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import listingRouter from "./routes/listingRouter.js"
dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// routers
app.use("/api/v1/user",userRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/listing",listingRouter)

// middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal server error!";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


// db onfiguration
const port=process.env.PORT||9000;

mongoose.connect(process.env.MONGODB).then(()=>{
console.log("Connected to MongoDB");
}).catch((error)=>console.log(error.message))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})