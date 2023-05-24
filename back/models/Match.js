import mongoose from 'mongoose'; // Importer Mongoose
import user from './user.js';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const MatchSchema = new Schema({
    IdSession: {
        type: String,
        required: true // Cet attribut est obligatoire
    },
    IdReciver: {
        type: String,
        required: true
    },
    IdOutfit: {
        type: Array,
        required: false
    },
    IdOutfitR:{
        type : Array,
        required :false

    },
    Etat: {
        type: Boolean,

        required: false
    },
    totrade:{
        type :String,
        required :false
    },
    totradeR:{
        type :String,
        required :false
    },
    trader:{
        type :String,
        required :false
    },
    userr:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:false
    }
  
   

}, {
    timestamps: true // Ajouter automatiquement createdAt et updatedAt
});

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
export default model("Match", MatchSchema);