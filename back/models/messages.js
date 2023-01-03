import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose;

const msgSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
   to: {
    type: String,
    required: true
    },
    matchID:{
        type: String,
    required: true
    }
},
{
    timestamps: true // Ajouter automatiquement createdAt et updatedAt
});
export default model("messages", msgSchema);