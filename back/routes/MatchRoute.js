import express from 'express';
import { swipe, Swipeleft, verifyexistingmatch } from '../controllers/MatchController.js';
const router = express.Router();
router.post("/create",Swipeleft);
router.put("/verif/:IdSession/:IdReciver",verifyexistingmatch)
router.put("/swipe/:IdReciver",swipe)
export default router;