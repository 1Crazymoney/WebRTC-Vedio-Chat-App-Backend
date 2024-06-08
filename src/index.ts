import express from 'express';
import http from 'http';
import serverConfig from '../config/server-config';
import { Server } from 'socket.io';
import cors from 'cors';
import roomHandler from './handlers/room-handler';
import logger from '../config/logger-config'; // Import the Winston logger

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    logger.info("New User Connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        logger.info("User Disconnected");
    });
});

server.listen(serverConfig.PORT, () => {
    logger.info(serverConfig.PORT);
    logger.info(`Server is up and running at the port ${serverConfig.PORT}`);
});