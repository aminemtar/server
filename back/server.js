import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import session from 'express-session';
import cookieParser from 'cookie-parser';
import outfitRoutes from './routes/outfit.js';
import userroute from './routes/Auth.js';
import matchroute from './routes/MatchRoute.js'
import auth from './middleware/auth.js';
import passport from 'passport';
import cookieSession from 'cookie-session';
import swaggerDoc from 'swagger-ui-express';
import swggerDocumentation from './Documentation.js';


const app = express();

const port = process.env.PORT || 9090 ;
const databaseName = process.env.DATABASE;


// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
    .connect(`mongodb+srv://medamine:maqarouna@clothy.0wz746t.mongodb.net/clothy`,{
        useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        // Une fois connecté, afficher un message de réussite sur la console
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        // Si quelque chose ne va pas, afficher l'erreur sur la console
        console.log(err);
    });
    app.set('views', './views');
   
    app.use(express.urlencoded({ extended: true }));  
app.use(express.json());
app.use(cookieParser());
app.use("/img",express.static('public/image'));// servir les images et les fichiers
app.use("/uploads",express.static('uploads'));
app.use(session({ secret: process.env.SECRET, saveUninitialized: true, resave: true }));
app.use("/documentations",swaggerDoc.serve);
app.use("/documentations",swaggerDoc.setup(swggerDocumentation));






app.use('/outfit', outfitRoutes);
app.use('/api',userroute);
app.use('/match',matchroute);






app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});