import User from "../models/userModel.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcrypt";
import {errorHandle} from "../utils/errorHandler.js"


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

export const signIn=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const validUser=await User.findOne({email});
        if(!validUser){
            res.status(401).json(errorHandle(401,"Email is not correct!"))
        }
        const comparePassword=await bcrypt.compare(password,validUser.password);
        if(!comparePassword){
            res.status(401).json(errorHandle(401,"Password is not correct!"))
        }
        const token= jwtToken.sign({id:validUser._id},process.env.JWTSECRET);
       const {password:pass,...rest}=validUser._doc;
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({rest,token});
    } catch (error) {
        next(error)
    }
}