import Listing from "../models/listingModel.js"
import { errorHandle } from "../utils/errorHandler.js";


export const createListing=async(req,res,next)=>{
    try {
        const newListing=await Listing.create(req.body);
      return  res.status(201).json(newListing);
    } catch (error) {
           next(error);
    }
}

export const deleteUserListing=async(req,res,next)=>{
  const findList=await Listing.findById(req.params.id);
  if(!findList){
    return next(errorHandle(401,"Listing not found"))
  }
  if(req.user.id!==findList.userRef){
   return next(errorHandle(401,"You can only delete your own listing!!"))
  }
  try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json("Listing has been deleted!");
  } catch (error) {
      next(error)
  }
}

export const editListing=async(req,res,next)=>{
  const list=await Listing.findById(req.params.id);
  if(!list){
    return next(errorHandle(401,"List not found!"));
  }
  if(req,user.id!==list.userRef){
    return next(errorHandle(401,"You can update own list!"))
  }
  try {

    const updatingListing=await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )

    res.status(200).json(updatingListing);
    
  } catch (error) {
    next(error)
  }
}

export const getListing=async(req,res,next)=>{
  try {
    const list=await Listing.find(req.params.id);
    if(!list){
      return next(401,"Listing not found");
    }

    res.status(200).json(list);
    
  } catch (error) {
    next(error)
  }
}