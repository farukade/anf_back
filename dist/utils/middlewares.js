"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.upload = exports.newStorage = exports.securityCheck = exports.loggerMiddleware = exports.getToken = exports.encodeToken = exports.decodeToken = exports.authorize = void 0;
var express_jwt_1 = require("express-jwt");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
var logger_1 = require("./logger");
var utils_1 = require("./utils");
var multer_1 = __importStar(require("multer"));
var path_1 = require("path");
var crypto_1 = require("crypto");
var moment_1 = __importDefault(require("moment"));
var util_1 = require("util");
(0, dotenv_1.config)();
var secret = process.env.JWT_SECRET || '';
var logSecret = process.env.LOG_SECRET;
var authorize = function (requiredPermissions) {
    return [
        (0, express_jwt_1.expressjwt)({ secret: secret, algorithms: ["HS256"] }), function (req, res, next) {
            var token = (0, exports.getToken)(req);
            var result = (0, exports.decodeToken)(token);
            var permissions = result.permissions, id = result.id, username = result.username, userType = result.userType;
            req.user = { userType: userType, id: id, username: username, permissions: permissions };
            next();
        }
    ];
};
exports.authorize = authorize;
var decodeToken = function (token) {
    try {
        var decoded = (0, jsonwebtoken_1.verify)(token, secret);
        if (typeof decoded !== 'string') {
            return decoded.data;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log('Failed to decode token: ', error);
        return null;
    }
};
exports.decodeToken = decodeToken;
var encodeToken = function (data) {
    try {
        var token = (0, jsonwebtoken_1.sign)({ data: data }, secret, {
            expiresIn: "48h"
        });
        return token;
    }
    catch (error) {
        logger_1.logger.error(error);
        return '';
    }
};
exports.encodeToken = encodeToken;
var getToken = function (req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return '';
};
exports.getToken = getToken;
var loggerMiddleware = function (req, res, next) {
    try {
        logger_1.logger.info("".concat(req.method, " ").concat(req.hostname, " ").concat(req.url, " ").concat(req.ip));
        next();
    }
    catch (error) {
        logger_1.logger.error(error);
    }
};
exports.loggerMiddleware = loggerMiddleware;
var securityCheck = function (req, res, next) {
    try {
        var secret_1 = req.query.secret;
        if (!logSecret || logSecret === "") {
            return (0, utils_1.handleBadRequest)({ res: res, message: "Log access denied!" });
        }
        if (!secret_1 || secret_1 === "") {
            return (0, utils_1.handleBadRequest)({ res: res, message: "Log access denied!" });
        }
        if (secret_1 === logSecret) {
            next();
        }
        else {
            return (0, utils_1.handleBadRequest)({ res: res, message: "Log access denied!" });
        }
    }
    catch (error) {
        return (0, utils_1.handleError)(res, error);
    }
};
exports.securityCheck = securityCheck;
var newStorage = function () {
    return (0, multer_1.diskStorage)({
        destination: function (req, file, cb) {
            var filePath = (0, path_1.join)(__dirname + "/../../public/uploads");
            cb(null, filePath);
        },
        filename: function (req, file, cb) {
            var randomName = "".concat((0, crypto_1.randomBytes)(5).toString("hex"), "-").concat((0, moment_1["default"])().format("YYYYMMDDHHmmssSSS")).concat((0, path_1.extname)(file.originalname));
            cb(null, randomName);
        }
    });
};
exports.newStorage = newStorage;
var uploadFile = (0, multer_1["default"])({
    storage: (0, exports.newStorage)(),
    limits: { fileSize: 10 * 1024 * 1024 }
}).any();
exports.upload = (0, util_1.promisify)(uploadFile);
//# sourceMappingURL=middlewares.js.map