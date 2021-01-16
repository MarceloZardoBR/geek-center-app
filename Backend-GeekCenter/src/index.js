const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3333;

const connectedUsers = {};

io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;

    console.log('Usuarios Conectados \n', connectedUsers);
})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(routes);

server.listen(port, () =>{
    console.log(`Backend Executando... on PORT: ${port}.`);
});

module.exports = server;