import bcrypt from "bcrypt";
import User from "../models/userModel.js";


export const signUp=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        const hashPassword=bcrypt.hashSync(password,10);
        const newUser=new User({
            username,email,password:hashPassword
        })
        await newUser.save();
        res.status(201).json({message:"User created successfuly!"})
    } catch (error) {
        next(error)
    }
}