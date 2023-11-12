"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.logger = void 0;
var moment_1 = __importDefault(require("moment"));
var winston_1 = require("winston");
var __1 = require("..");
// Create a logger with two transports: console and a file
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.printf(function (_a) {
        var level = _a.level, message = _a.message;
        __1.io
            .of('/logs')
            .emit('log-change', {
            success: true,
            data: "[".concat((0, moment_1["default"])().format("HH:mm:ss DD-MM-YYYY"), "] ").concat(level, ": ").concat(message)
        });
        return "[".concat((0, moment_1["default"])().format("HH:mm:ss DD-MM-YYYY"), "] ").concat(level, ": ").concat(message);
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
    ]
});
//# sourceMappingURL=logger.js.map