import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const outfitSchema = new Schema({
    typee: {
        type: String,
        required: true // Cet attribut est obligatoire
    },
    couleur: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    userID: {
        type: String,
        required: true
    },
    taille: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

 
   

}, {
    timestamps: true // Ajouter automatiquement createdAt et updatedAt
});

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
export default model("outfit", outfitSchema);