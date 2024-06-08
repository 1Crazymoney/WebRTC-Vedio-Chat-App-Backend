import { Socket } from "socket.io";
import logger from "../../config/logger-config"; // Update the path to logger-config
import { v4 as UUIDv4 } from 'uuid';

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
        logger.info(`Room Created with ID: ${roomId}`);
    }

    const joinedRoom = ( {roomId}: {roomId:string}) => {
        logger.info(`New user has joined the room ${roomId}`);
    }

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

export default roomHandler;
