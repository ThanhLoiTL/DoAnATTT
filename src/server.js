import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

let app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors({
    origin: true
}));
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8081;

server.listen(port, () => {
    console.log('Nodejs is running on the port : ' + port);
})