import express from 'express';
import upload from '../middleware/imageUP.js' ;
import {check} from 'express-validator';
import {
    
    addOnce, login,recover,patchOnce,res, deletee, logout, us, getAll, getOnce, testcode, forgotPassword, updateProfile,confirm, changePassword, UpdateImage
    
} from '../controllers/Authcontroller.js';
const router =express.Router();



router.post('/register',upload.single('imageF'),addOnce);

router.post('/login',login)
router .post('/recover',recover)
router.post("/changepwcode",testcode)
router.post("/forgetpwd",forgotPassword);
 router.    put("/update/:id",patchOnce)
       .put("/changepass",res)
      .put("/up/:email",updateProfile );
      
       router.delete("/supp/:id",deletee);
       router.get("/logout", logout);
       router.get("/us",us);
       router.get("/a",getAll);
       router.get("/b/:id",getOnce);
       router.get("/confirm/:email",confirm);
       router.put("/updatepass/:id",changePassword)
       .post("/updateImage/:id",upload.single('imageF'),UpdateImage)




export default router;