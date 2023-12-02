import jwt from "jsonwebtoken";
import { errorHandle } from "./errorHandler.js";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    console.log("salam");
    if (!token) {
      next(errorHandle(401, "Unauthorized!"));
    }
     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            next(errorHandle(403,'Forbiden'))
        };
        req.user=user;
        next();
    })
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
