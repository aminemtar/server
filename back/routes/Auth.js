import express from 'express';
import {check} from 'express-validator';
import {
    
    addOnce, login,recover,patchOnce,res, deletee, logout, us, getAll, getOnce, testcode, forgotPassword, updateProfile
    
} from '../controllers/Authcontroller.js';
const router =express.Router();



router.post('/register',addOnce)

router.post('/login',login)
router .post('/recover',recover)
router.post("/changepwcode",testcode)
router.post("/forgetpwd",forgotPassword);
// .get('/reset/:token',reset)
// .post('/reset/:token', [
//     check('password').not().isEmpty() ],
//  resetPassword);
 router.    put("/update/:id",patchOnce)
       .put("/changepass",res)
      .put("/up",updateProfile );
       router.delete("/supp/:id",deletee);
       router.get("/logout", logout);
       router.get("/us",us);
       router.get("/a",getAll);
       router.get("/b/:id",getOnce);




export default router;