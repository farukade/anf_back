"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.initSocket = void 0;
var __1 = require("..");
var app_gateway_1 = __importDefault(require("./app.gateway"));
var initSocket = function () {
    try {
        __1.io
            .of('/logs')
            .on('connection', function (socket) {
            console.log('new user', socket.id, 'connected');
            app_gateway_1["default"].fetchLogs(socket);
            socket.on('disconnect', function () {
                console.log('user', socket.id, 'user disconnected');
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.initSocket = initSocket;
// export const sendMessageToClient = (message) => {
//   io.emit('message', message);
// }
//# sourceMappingURL=index.js.map