import { server as httpServer } from 'http';
import { server as SocketServer } from 'ws';

const server = httpServer.createServer((req, res) => {});

server.listen(3000, () => {
    console.log("Listening on port 3000...");
});

const wsServer = new SocketServer({ httpServer: server });

const connections = [];

wsServer.on('request', (req) => {
    const connection = req.accept();
    console.log('new connection');
    connections.push(connection);

    connection.on('message', (mes) => {
        connections.forEach(element => {
            if (element !== connection)
                element.sendUTF(mes.utf8Data);
        });
    });

    connection.on('close', (resCode, des) => {
        console.log('connection closed');
        connections.splice(connections.indexOf(connection), 1);
    });
});
