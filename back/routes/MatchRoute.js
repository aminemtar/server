import express from 'express';
import {  swipe, Swipeleft, verifyexistingmatch ,matchoutfit, matchoutfitR, trade } from '../controllers/MatchController.js';
const router = express.Router();
router.post("/create",Swipeleft);
router.put("/verif/:IdSession/:IdReciver",verifyexistingmatch)
router.put("/swipe/:IdReciver",swipe)
router.get('/matchoutfit/:id',matchoutfit)
router.get('/matchoutfitR/:id',matchoutfitR)
router.post('/trade/:id',trade)
//router.get("/getOutfit/:IdReciver",swipedclothes)
export default router;