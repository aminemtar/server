import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, "IMAGE"+'_'+Date.now() + ext)
  }
})
var upload = multer({
    storage : storage,
    
    fileFilter :function(req,file,callback){
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg")
        {
            callback(null,true)
        }else{
            console.log("only png ou jpeg")
            callback(null,false)

        }
    }
})

export default upload;