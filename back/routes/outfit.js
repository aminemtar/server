import express from 'express';
import verif from '../verifytoken.js';
import upload from '../middleware/imageUP.js' ;
import sharp from 'sharp';
import path from 'path';
import fs from 'fs'

import {
    getAll,
    addOnce,
    getOnce,
    patchOnce,
    deleteOnce,
    Updatephoto,
    getOutfitByType,
    getOutfitByUser,
    getswiped
} from '../controllers/outfit.js';

const router = express.Router();

router
    .get('/getall',getAll)
    .post('/addOutfit',upload.single('photo'),addOnce)
    .post("/updatephoto/:id",upload.single('photo'),Updatephoto,)
    .get("/OFT/:typee",getOutfitByType)
    .get("/allOFT",getOutfitByUser)
    .get("/getswiped",getswiped)

router
    
    .get("/once/:id",getOnce)
    .put("/updateOF/:id",patchOnce)
    .delete('/delete/:id',deleteOnce);

export default router;