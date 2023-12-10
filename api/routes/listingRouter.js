import express from 'express';
import { createListing,deleteUserListing,editListing,getListing} from '../controllers/listingController.js';
import verifyToken from '../utils/verifyToken.js';


const router=express.Router();


router.post('/createListing',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteUserListing);
router.post('/update/:id',verifyToken,editListing );
router.get('/get/:id',getListing);







export default router;