import { io } from "..";
import { Socket } from 'socket.io';
import appGateway from "./app.gateway";

export const initSocket = () => {
  try {
    io
      .of('/logs')
      .on('connection', (socket: Socket) => {
        console.log('new user', socket.id, 'connected');

        appGateway.fetchLogs(socket);

        socket.on('disconnect', () => {
          console.log('user', socket.id, 'user disconnected');
        });
      });
  } catch (error) {
    console.log(error);
  }
}

// export const sendMessageToClient = (message) => {
//   io.emit('message', message);
// }