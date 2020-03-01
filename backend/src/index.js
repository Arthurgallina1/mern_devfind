const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cors = require('cors');
const http = require('http');
const { setWebSocket } = require('./websocket')
const app = express();
const server = http.Server(app);
const { mongoConnection } = require('./secrets')

setWebSocket(server);


mongoose.connect(`${mongoConnection}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(cors());
app.use(express.json());
app.use(router);

server.listen(8000);
