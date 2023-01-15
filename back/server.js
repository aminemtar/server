import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import session from 'express-session';
import cookieParser from 'cookie-parser';
import outfitRoutes from './routes/outfit.js';
import userroute from './routes/Auth.js';
import matchroute from './routes/MatchRoute.js'
import cookieSession from 'cookie-session';
import swaggerDoc from 'swagger-ui-express';
import swggerDocumentation from './Documentation.js';
import { WebSocket, WebSocketServer } from 'ws';
import messages from './models/messages.js';
import enableWs from 'express-ws'
import match from './models/Match.js'
import user from './models/user.js'
import { v4 as uuidv4 } from 'uuid';



const app = express();
enableWs(app)


const port = process.env.PORT || 9090;
const databaseName = process.env.DATABASE;
var aWss = enableWs(app).getWss("/room/")
var createroom = enableWs(app).getWss("/")



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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static('uploads'));
//app.use("/upload", express.static('uploads/outfit'));
app.use(session({
    secret: process.env.SECRET, cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }, saveUninitialized: true, resave: true
}));
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swggerDocumentation));
app.use('/outfit', outfitRoutes);
app.use('/api', userroute);
app.use('/match', matchroute);
app.use('/term', function (req, res) {
    res.sendFile('/Users/medamine/Workspace/server/back/views/termsanservices.html');
});

app.ws('/room/:id', (ws, req) => {


    aWss.clients.forEach(function each(client) {
        console.log(client + "aws elementss")
        console.log(client.id)
        console.log(client.upgradeReq)
        if (client.id === (req.session.user._id).concat(req.params.id)) {
            // client.id = "closed"
            // delete client.id
            client.terminate()

        }

    })
    ws.id = (req.session.user._id).concat(req.params.id)
    console.log(`New client connected with id: ${ws.id}`);



    messages.find({ "matchID": req.params.id })
        .then(doc => {
            doc.forEach(element => {
                let msgtosend = Object.assign({ "msg": element })
                ws.send(JSON.stringify(msgtosend))
            });
            // var messagejson = Object.assign({ "msg": doc })

            //  ws.send(msgtosend)
            console.log(doc)
        })


    console.log(req.params.id)
    console.log("rani connectit aal room" + req.params.id)


    ws.on('message', msg => {
        const mess = JSON.parse(msg);


        let M = {
            from: req.session.user._id,
            to: mess.to,
            matchID: mess.idMatch,
            message: mess.message
        }
        let newM = {
            _id: uuidv4(),
            from: req.session.user._id,
            to: mess.to,
            matchID: mess.idMatch,
            message: mess.message
        }
        console.log(M)
        // console.log(JSON.stringify(createroom.clients) + "clients")

        let toclient = findClientById((mess.to).concat(req.params.id))
        //console.log("sent to :" + toclient.id)

        if (typeof toclient !== 'undefined' && mess.idMatch === req.params.id) {
            console.log(req.params.id + "params")
            console.log(mess.idMatch + "idmatch")
            let newmes = Object.assign({ "msg": newM })
            toclient.send(JSON.stringify(newmes))

        }

        messages.create(M)

    })

    ws.on('close', () => {
        console.log('message WebSocket was closed')
    })

})


app.ws('/', async (ws, req, res) => {

    let clientTodelete = findClientById(req.session.user._id)
    if (typeof clientTodelete !== 'undefined') {
        clientTodelete.terminate()

    }

    ws.id = req.session.user._id
    console.log(`New client connected with id: ${ws.id}`);

    async function findroom() {
        const foundRoom = match.find({ $or: [{ IdSession: req.session.user._id, Etat: true }, { IdReciver: req.session.user._id, Etat: true }] })
        return foundRoom;
    };
    const room = await findroom();

    console.log(room)
    async function findUser() {
        // room
        room.forEach(element => {
            if (element.IdSession === req.session.user._id) {
                const uf = user.findOne({ _id: { $in: element.IdReciver } }).then(doc => {
                    var newe = Object.assign({ "user": doc }, { "room": element })
                    ws.send(JSON.stringify(newe));
                })
                console.log(uf + "ddc")
            } else if (element.IdReciver === req.session.user._id) {
                const uff = user.findOne({ _id: { $in: element.IdSession } }).then(doc => {
                    var newe = Object.assign({ "user": doc }, { "room": element })
                    ws.send(JSON.stringify(newe));
                    console.log(newe)
                })
                console.log(uff + "ddc")
            }
        });
        return room;
    };
    const fuser = await findUser();
    console.log(fuser + "neeew rooom")
    ws.on('message', async msg => {
        console.log("sending message" + msg)
        async function findroom() {
            const foundRoom = match.findOne({ IdSession: msg, IdReciver: req.session.user._id, Etat: true })
            return foundRoom;
        };
        const room = await findroom();
        console.log(room + "found rooom here")
        async function findUser() {
            // room
            const uf = user.findOne({ _id: mongoose.Types.ObjectId(msg) }).then(doc => {
                var newe = Object.assign({ "user": doc }, { "room": room })
                console.log(newe + "found user and room here")
                // moula = findClientById(msg)
                // moula.send(JSON.stringify(newe))

                let clienttosend = findClientById(msg)
                if (typeof clienttosend !== 'undefined') {
                    let newroom = JSON.stringify(newe)
                    clienttosend.send(newroom)
                    console.log("found and sent")
                }
                // createroom.clients.forEach(function (client) {
                //     if (client.id === msg) {
                //         client.send(JSON.stringify(newe));
                //         console.log("found and sent")
                //     }
                // });
            })
            console.log(uf + "ddc")
            return room;
        };
        const fuser = await findUser();
        console.log(fuser + "last")
    })
    ws.on('close', () => {
        console.log('Room WebSocket was closed')

    })
})
function findClientById(id) {
    let clientFound;
    createroom.clients.forEach(client => {
        if (client.id === id && client.readyState === WebSocket.OPEN) {
            clientFound = client;
        }
    });

    return clientFound;
}



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
