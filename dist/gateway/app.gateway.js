"use strict";
exports.__esModule = true;
var appGateway = {
    fetchLogs: function (socket) {
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
    sendLogs: function (socket, data) {
        // try {
        //   socket.emit(
        //     'log-change',
        //     data
        //   );
        // } catch (error) {
        //   logger.error(error || "Error: Unexpected socket error!");
        // }
    }
};
exports["default"] = appGateway;
//# sourceMappingURL=app.gateway.js.map