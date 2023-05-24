import express from 'express';
import {  swipe,matchoutfit, matchoutfitR, trade,getAll, getAlll } from '../controllers/MatchController.js';

const router = express.Router();
router.put("/swipe/:IdReciver/:id",swipe)
router.get('/matchoutfit/:id',matchoutfit)
router.get('/matchoutfitR/:id',matchoutfitR)
router.post('/trade/:id',trade)
router.get('/getmatchs',getAll)
router.get('/getmatch',getAlll)

//router.get("/getOutfit/:IdReciver",swipedclothes)
export default router;