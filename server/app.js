import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"
import { Server } from "socket.io"

//************* initialize the app ********************

dotenv.config();
const app = express();
//New Server Create
const server = http.createServer(app);
// Socket New instance create
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
// app.options('*', cors())

//*************** */ Socket start and middleware ********************

io.on("connection", socket => {
    console.log("new user connect");

    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', `server: ${msg}`);
    });

    // custom event 
    socket.on("message", (data) => {
        console.log(data);
    })


    // Socket disconnect 
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

//**************** start the server ********************
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});