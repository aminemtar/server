import mongoose from "mongoose";
const { Schema, model } = mongoose; 
const ImageSchema = Schema({
    imageF:{
        type: String,
        required : true
       },
    image:{
        data:Buffer,
        contentType: String
     }
})

export default model("ImageModel", ImageSchema);