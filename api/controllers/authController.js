import User from "../models/userModel.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcrypt";
import {errorHandle} from "../utils/errorHandler.js";



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
            return next(errorHandle(401,"Email is not correct!"))
        }
        const comparePassword=await bcrypt.compare(password,validUser.password);
        if(!comparePassword){
            return next(errorHandle(401,"Password is not correct!"))
        }
        const token= jwtToken.sign({id:validUser._id},process.env.JWTSECRET);
       const {password:pass,...rest}=validUser._doc;
        res.cookie("access_token",token)
        res.status(200).json({rest,token});
    } catch (error) {
        next(error)
    }
}

export const google=async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(user){
            const token= jwtToken.sign({id:user._id},process.env.JWTSECRET);
            const{password:pass,...rest}=user._doc;
            res.status(201).json({rest,token});
        }
          const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
          const hashPassword=await bcrypt.hash(generatePassword,10);
        const newUser=new User({
            username:(req.body.name).split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),
            email:req.body.email,
            password:hashPassword,
            avatar:req.body.photo 
        })

        await newUser.save();
        const token=jwtToken.sign({id:newUser._id},process.env.JWTSECRET);
        const{password:pass,...rest}=newUser._doc;
        res.cookie("access_token",token,{httpOnly:true});
        res.status(201).json({rest,token})
       
        
    } catch (error) {
        next(error)
    }
}