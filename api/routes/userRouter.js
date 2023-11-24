import express from "express";
import { createUser, getUser } from "../controllers/userController.js";

const router=express.Router();


router.post("/newuser",createUser)
router.get("/user",getUser);


export default router;