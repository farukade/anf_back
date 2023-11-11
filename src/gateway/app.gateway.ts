import { execute } from '@getvim/execute';
import { join } from 'path';
import { Socket } from 'socket.io';
import { logger } from '../utils/logger';
import { io } from '..';
import { initSocket } from '.';

const appGateway = {
  fetchLogs: (socket: Socket) => {
    // try {
    //   socket.on('fetch-logs', async () => {

    //     const logFilePath = join(__dirname, "../../error.log");
    //     const rs = await execute(`tail -n 1000 ${logFilePath}`);

    //     if (rs) {
    //       socket.emit(
    //         socket.id.toString(),
    //         { succes: true, data: rs }
    //       );
    //     }
    //   });
    // } catch (error) {
    //   logger.error(error || "Error: Unexpected socket error!");
    // }
  },
  sendLogs: (socket: Socket, data: any) => {
    // try {
    //   socket.emit(
    //     'log-change',
    //     data
    //   );
    // } catch (error) {
    //   logger.error(error || "Error: Unexpected socket error!");
    // }
  }
}
export default appGateway;