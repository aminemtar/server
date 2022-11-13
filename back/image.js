
import multer from 'multer';
import express from 'express';
import ImageModel from './models/imageM.js';
const app = express();
const port = process.env.PORT;


const storage = multer.diskStorage({
    destination :"uplods",
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    },
  });
  const upload = multer({
    storage:storage
  }).single('testImage')
 app.post("/uploads",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else
        {
        const newIamge = new ImageModel({
            imageF : req.body.imageF,
            image : {
                data: req.file.filename,
                contentType : "image/jpeg"
            }
        })
       
        newImage.save()
        .then(()=>res.send("succesfully uploaded"))
        .catch((err)=> console.log(err))
        }
    })
 })
 
 
app.listen(8080, () => {
    console.log(`Server running at http://192.168.1.5:${9090}/`);
});