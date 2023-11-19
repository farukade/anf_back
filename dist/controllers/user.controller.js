"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UserController = void 0;
var crypto_1 = require("crypto");
var utils_1 = require("../utils/utils");
var middlewares_1 = require("../utils/middlewares");
exports.UserController = {
    get: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, result, aggregations, paging, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    id = req.query.id;
                    if (!(id && id !== "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, utils_1.prisma.users.findUnique({
                            where: { id: Number(id) }
                        })];
                case 1:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "user not found" })];
                case 2: return [4 /*yield*/, utils_1.prisma.users.findMany({
                        orderBy: {
                            createdAt: 'desc'
                        }
                    })];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, utils_1.prisma.users.aggregate({
                            _count: {
                                id: true
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        })];
                case 4:
                    aggregations = _a.sent();
                    paging = (0, utils_1.getMeta)(req.query, aggregations._count.id);
                    if (result.length)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result, paging: paging })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "users not found" })];
                case 5:
                    ;
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    (0, utils_1.handleError)(res, error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    create: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var body, email, username, password, restBody, existing, salt, hash, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    body = req.body;
                    email = body.email, username = body.username, password = body.password, restBody = __rest(body, ["email", "username", "password"]);
                    if (!username || !email || !password)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "no username | email | password in parameters" })];
                    if ((username === null || username === void 0 ? void 0 : username.length) < 3 || (password === null || password === void 0 ? void 0 : password.length) < 5)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "username | password not of required length" })];
                    return [4 /*yield*/, utils_1.prisma.users.findUnique({
                            where: { email: email }
                        })];
                case 1:
                    existing = _a.sent();
                    if (existing)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "".concat(email, " already registered") })];
                    salt = (0, crypto_1.randomBytes)(30).toString('hex');
                    hash = (0, crypto_1.pbkdf2Sync)(password, salt, 1000, 64, "sha512").toString("hex");
                    return [4 /*yield*/, utils_1.prisma.users.create({
                            data: __assign({ email: email.toLowerCase(), username: username.toLowerCase(), password: hash, salt: salt }, restBody)
                        })];
                case 2:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "unexpected error" })];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, (0, utils_1.handleError)(res, error_2)];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, rs, token, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, username = _a.username, password = _a.password;
                    if (!username ||
                        (username === null || username === void 0 ? void 0 : username.length) < 5 ||
                        !password || (password === null || password === void 0 ? void 0 : password.length) < 5)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "username | password not present or not of required length" })];
                    return [4 /*yield*/, isValidPassword(username.toLowerCase(), password)];
                case 1:
                    rs = _b.sent();
                    token = (0, middlewares_1.encodeToken)(rs.data);
                    if (rs.success)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: __assign(__assign({}, rs === null || rs === void 0 ? void 0 : rs.data), { token: token }), message: rs === null || rs === void 0 ? void 0 : rs.message })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: rs.message || "unexpected error" })];
                case 2:
                    error_3 = _b.sent();
                    return [2 /*return*/, (0, utils_1.handleError)(res, error_3)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    "delete": function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.query.id;
                    if (!id || !id.length)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "no id in req params" })];
                    return [4 /*yield*/, utils_1.prisma.users["delete"]({
                            where: {
                                id: Number(id)
                            }
                        })];
                case 1:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res })];
                    (0, utils_1.handleBadRequest)({ res: res, message: "unexpected error, delete failed" });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    return [2 /*return*/, (0, utils_1.handleError)(res, error_4)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    update: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id, restData, result, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, id = _a.id, restData = __rest(_a, ["id"]);
                    if (!id || !restData)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "req body incomplete" })];
                    return [4 /*yield*/, utils_1.prisma.users.update({
                            where: { id: Number(id) },
                            data: restData
                        })];
                case 1:
                    result = _b.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "unexpected error, modification failed" })];
                case 2:
                    error_5 = _b.sent();
                    (0, utils_1.handleError)(res, error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    verifyToken: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res })];
            }
            catch (error) {
                return [2 /*return*/, (0, utils_1.handleError)(res, error)];
            }
            return [2 /*return*/];
        });
    }); }
};
var isValidPassword = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, hash, password_1, salt, restUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.prisma.users.findUnique({ where: { username: username } })];
            case 1:
                user = _a.sent();
                if (!user || !(user === null || user === void 0 ? void 0 : user.salt))
                    return [2 /*return*/, { success: false, message: "user not found" }];
                hash = (0, crypto_1.pbkdf2Sync)(password, user.salt, 1000, 64, "sha512").toString("hex");
                if (user.password === hash) {
                    password_1 = user.password, salt = user.salt, restUser = __rest(user, ["password", "salt"]);
                    return [2 /*return*/, { success: true, message: "password verification success", data: restUser }];
                }
                ;
                return [2 /*return*/, { success: false, message: "password verification failed" }];
        }
    });
}); };
//# sourceMappingURL=user.controller.js.map