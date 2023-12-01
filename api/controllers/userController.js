import User from "../models/userModel.js";
import {errorHandle}  from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

export const createUser=async(req,res)=>{
    try {
        res.status(201).json("Created User")
    } catch (error) {
        
    }
}

export const getUser=async (req,res)=>{
    
    try {
        res.status(200).json("Salam Orxan")
    } catch (error) {
        
    }
}

export const updateUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
       return next(errorHandle(401,"You can only update your own account"));
    }
    try {
    if(req.body.password){
       req.body.password=await bcrypt.hash(req.body.password,10);
    }
    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.password
        }
    },{new:true});

    const{password:pass,...others}=updateUser._doc;
    res.status(200).json(others)
        
    } catch (error) {
        
    }
}