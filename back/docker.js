import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import session from 'express-session';
import cookieParser from 'cookie-parser';
import outfitRoutes from './routes/outfit.js';
import userroute from './routes/Auth.js';
import auth from './middleware/auth.js';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { Server } from 'socket.io';
const io = new Server(9090)

const app = express();

const port = process.env.PORT ;
const databaseName = process.env.DATABASE;
//app.use(passport.initialize());

//Setting Up Session
// app.use(passport.session());
// app.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
// }))

// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
    .connect(`mongodb+srv://medamine:maqarouna@clothy.0wz746t.mongodb.net/Data`,{
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
    app.set('view engine', 'jade');
    app.use(express.urlencoded({ extended: true }));  
app.use(express.json());
app.use(cookieParser());
app.use("/img",express.static('public/image'));// servir les images et les fichiers
app.use("/uploads",express.static('uploads'));
app.use(session({ secret: process.env.SECRET, saveUninitialized: true, resave: true }));
io.on('connection', (socket) => {

    console.log('a user connected');
    socket.emit('message', 'Hello world');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', msg => {

        io.emit('message', msg)


    })
});

// app.get('/google/callback', 
//     passport.authenticate('google', 
//     {failureRedirect: '/failed'}), 
//     (req, res) => {
//         res.redirect('/good');
//     })


const user = {
    name: "Mano Sriram",
    source: "Youtube"
};
app.get("/login", (req, res) => {
    req.session.user = user;
    req.session.save();
    return res.send("User logged in");
});("/",(req,res,next)=>{
    res.json({message :"it works"})
})
app.get
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





app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});