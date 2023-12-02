import express from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";

const router=express.Router();


router.post("/newuser",createUser)
router.get("/user",getUser);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);


export default router;