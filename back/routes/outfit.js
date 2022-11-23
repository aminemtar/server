import express from 'express';
import verif from '../verifytoken.js';
import upload from '../middleware/imageUP.js' ;

import {
    getAll,
    addOnce,
    getOnce,
    patchOnce,
    deleteOnce,
    Updatephoto,
    getOutfitByType
} from '../controllers/outfit.js';

const router = express.Router();

router
    .get('/getall',getAll)
    .post('/addOutfit',upload.single('photo'),addOnce)
    .post("/updatephoto/:id",upload.single('photo'),Updatephoto)
    .get("/OFT/:userID&:typee",getOutfitByType)

router
    
    .get("/once/:id",getOnce)
    .put("/updateOF/:id",patchOnce)
    .delete('/delete/:id',deleteOnce);

export default router;