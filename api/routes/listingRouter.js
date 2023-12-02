import express from 'express';
import { createListing } from '../controllers/listingController';
import {verifyToken} from '../utils/verifyToken.js';


const router=express.Router();


router.post('/listing',verifyToken,createListing)





export default router;