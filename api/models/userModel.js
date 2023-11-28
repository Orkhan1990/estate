import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
      type:String,
      default:"https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png"
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User=mongoose.model("user",userSchema);
export default User;