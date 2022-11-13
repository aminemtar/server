import mongoose from 'mongoose'; // Importer Mongoose
import crypto from 'crypto';

const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true // Cet attribut est obligatoire
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    },
    imageF:{
     type: String,
     required : true
    },
    image:{
       data:Buffer,
       contentType: String
    },
    email: {
        type: String,
        required: true,
        
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    isVerified:{
     type :Boolean,
     required : true
    },
    preference: {
        type: String,
        required: true
    },
    gender:{
     type : String,
     required :true
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