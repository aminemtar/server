import express from 'express';
import upload from '../middleware/imageUP.js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs'
import { check } from 'express-validator';
import {

    addOnce, login, recover, patchOnce, res, deletee, logout, us, getAll, getOnce, testcode, forgotPassword, updateProfile, confirm, changePassword, UpdateImage

} from '../controllers/Authcontroller.js';
const router = express.Router();



router.post('/register', upload.single('imageF'), addOnce);

router.post('/login', login)
router.post('/recover', recover)
router.post("/changepwcode", testcode)
router.post("/forgetpwd", forgotPassword);
router.put("/updateU/:id", patchOnce)
    .put("/changepass", res)
    .put("/updatePr/:id", updateProfile);

router.delete("/deleteUser/:id", deletee);
router.get("/logout", logout);
router.get("/SessionUser", us);
router.get("/allUser", getAll);
router.get("/once/:id", getOnce);
router.get("/confirm/:email", confirm);
router.put("/updatepass/:id", changePassword)
    .post("/updateImage/:email", upload.single('imageF'), UpdateImage)




export default router;