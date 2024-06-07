import express from 'express';
import http from 'http';
import serverConfig from '../config/server-config';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods: ["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("New User Connected");
    socket.on("disconnect",()=>{
        console.log("User Disconnected");
    })
})

server.listen(serverConfig.PORT, ()=>{
    console.log(`Server is up and running at the port${serverConfig.PORT}`);
})