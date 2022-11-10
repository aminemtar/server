import express from 'express';
import {check} from 'express-validator';
import {
    
    addOnce, login,recover,reset,resetPassword,patchOnce,res, sendConfirmationEmail, confirmation, forgotPassword, deletee, logout, us
    
} from '../controllers/Authcontroller.js';
const router =express.Router();



router.post('/register',addOnce)
router.post('/login',login)
router .post('/recover',recover)
.get('/reset/:token',reset)
.post('/reset/:token', [
    check('password').not().isEmpty() ],
 resetPassword);
 router.    put("/update/:id",patchOnce)
       .put("/changepass",res)
       .post("/sendEC",sendConfirmationEmail);
       router.get("/confirmation/:token", confirmation);
       router.post("/forgot-password", forgotPassword);
       router.delete("/supp/:id",deletee);
       router.get("/logout", logout);
       router.get("/us",us);




export default router;