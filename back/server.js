import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import session from 'express-session';
import cookieParser from 'cookie-parser';
import outfitRoutes from './routes/outfit.js';
import userroute from './routes/Auth.js';
import auth from './middleware/auth.js';

const app = express();

const port = process.env.PORT || 9090;
const databaseName = 'clothy';


// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
        // Une fois connecté, afficher un message de réussite sur la console
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        // Si quelque chose ne va pas, afficher l'erreur sur la console
        console.log(err);
    });
    app.set('views', './views');
    app.set('view engine', 'jade');
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "mano1234", saveUninitialized: true, resave: true }));
const user = {
    name: "Mano Sriram",
    source: "Youtube"
};
app.get("/login", (req, res) => {
    req.session.user = user;
    req.session.save();
    return res.send("User logged in");
});

app.get("/user", (req, res) => {
    const sessionUser = req.session.user;
    return res.send(sessionUser);
});

// app.get("/logout", (req, res) => {
//     req.session.destroy();
//     return res.send("User logged out!");
// });
app.use('/outfit', outfitRoutes);
app.use('/api',userroute);
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});