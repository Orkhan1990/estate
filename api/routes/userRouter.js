import express from "express";
import {  deleteUser, updateUser,userListings } from "../controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";


const router=express.Router();



router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken,userListings);


export default router;