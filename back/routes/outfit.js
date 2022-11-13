import express from 'express';
import verif from '../verifytoken.js';

import {
    getAll,
    addOnce,
    getOnce,
    patchOnce,
    deleteOnce
} from '../controllers/outfit.js';

const router = express.Router();

router
    .get('/getall',verif,getAll)
    .post('/add',addOnce);

router
    
    .get(getOnce)
    .put('/modif/:id',patchOnce)
    .delete('/delete/:id',deleteOnce);

export default router;