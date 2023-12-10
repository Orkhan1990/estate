import User from "../models/userModel.js";
import {errorHandle}  from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import Listing from "../models/listingModel.js";





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
        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
        return next(errorHandle(401,"You can delete only your account!"))
    }
    try {
       await User.findByIdAndDelete(req.params.id);
       res.clearCookie("access_token");
       res.status(201).json("User deleted successfuly!") 
    } catch (error) {
        next(error)
    }
}

export const userListings=async(req,res,next)=>{

    if(req.user.id!==req.params.id){
        return next(errorHandle(401,"You can only view your own listings!"))
    }else{
        try {
          const listings=await Listing.find({userRef:req.params.id});
          res.status(200).json(listings);
        
        } catch (error) {
            next(error)
        }
    }
   
}

