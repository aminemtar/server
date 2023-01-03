import mongoose from 'mongoose'; // Importer Mongoose
import crypto from 'crypto';

const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const userSchema = new Schema({
    firstname: {
        type: String,
        // Cet attribut est obligatoire
    },
    lastname: {
        type: String,
        
    },
    birthdate: {
        type: Date,
        
    },
    pseudo: {
        type: String,
        
    },
    imageF:{
     type: String,
     required : false
    },
    image:{
       data:Buffer,
       contentType: String
    },
    email: {
        type: String,
        required: true
        
        
    },
    phone: {
        type: Number,
        
    },
    password: {
        type: String,
        

    },
    isVerified:{
     type :Boolean,
     
    },
    preference: {
        type: String,
        
    },
    gender:{
     type : String,
     
    },
 
    resetPasswordToken: {
        type: String,
        required: false

    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },token:{
        type: String
    },swiped:{
        type: Array,
        required:false
    }





}, {
    timestamps: true // Ajouter automatiquement createdAt et updatedAt

});
userSchema.methods.generatePasswordRest = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
export default model("user", userSchema);