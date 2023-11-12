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
exports.NewsController = void 0;
var utils_1 = require("../utils/utils");
exports.NewsController = {
    get: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id, categoryId, topStory, featured, editorsPick, _b, take, skip, result, result, aggregation, paging, query, isTopStory, isFeatured, isEditorsPick, result, aggregation, paging, result, aggregation, paging, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 12, , 13]);
                    _a = req.query, id = _a.id, categoryId = _a.categoryId, topStory = _a.topStory, featured = _a.featured, editorsPick = _a.editorsPick;
                    _b = (0, utils_1.getPagination)(req.query), take = _b.take, skip = _b.skip;
                    if (!(id && id !== "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, utils_1.prisma.news.findUnique({
                            where: { id: Number(id) },
                            include: {
                                category: true
                            }
                        })];
                case 1:
                    result = _c.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "content not found" })];
                case 2:
                    if (!(categoryId && categoryId !== "")) return [3 /*break*/, 5];
                    return [4 /*yield*/, utils_1.prisma.news.findMany({
                            where: {
                                categoryId: Number(categoryId)
                            },
                            include: {
                                category: true
                            },
                            orderBy: {
                                createdAt: 'desc'
                            },
                            take: take,
                            skip: skip
                        })];
                case 3:
                    result = _c.sent();
                    return [4 /*yield*/, utils_1.prisma.news.aggregate({
                            _count: {
                                id: true
                            },
                            where: {
                                categoryId: Number(categoryId)
                            }
                        })];
                case 4:
                    aggregation = _c.sent();
                    paging = (0, utils_1.getMeta)(req.query, aggregation._count.id);
                    if (result.length)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result, paging: paging })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "contents not found" })];
                case 5:
                    if (!((topStory && topStory !== "") ||
                        (featured && featured !== "") ||
                        (editorsPick && editorsPick !== ""))) return [3 /*break*/, 8];
                    query = {};
                    isTopStory = topStory === "1" ? true : undefined;
                    isFeatured = featured === "1" ? true : undefined;
                    isEditorsPick = editorsPick === "1" ? true : undefined;
                    if (isTopStory) {
                        query.isTopStory = true;
                    }
                    if (isEditorsPick) {
                        query.isEditorsPick = true;
                    }
                    if (isFeatured) {
                        query.isFeatured = true;
                    }
                    return [4 /*yield*/, utils_1.prisma.news.findMany({
                            where: query,
                            include: {
                                category: true
                            },
                            orderBy: {
                                createdAt: 'desc'
                            },
                            skip: skip,
                            take: take
                        })];
                case 6:
                    result = _c.sent();
                    return [4 /*yield*/, utils_1.prisma.news.aggregate({
                            _count: {
                                id: true
                            },
                            where: query
                        })];
                case 7:
                    aggregation = _c.sent();
                    paging = (0, utils_1.getMeta)(req.query, aggregation._count.id);
                    if (result.length)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result, paging: paging })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "contents not found" })];
                case 8: return [4 /*yield*/, utils_1.prisma.news.findMany({
                        include: {
                            category: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: take,
                        skip: skip
                    })];
                case 9:
                    result = _c.sent();
                    return [4 /*yield*/, utils_1.prisma.news.aggregate({
                            _count: {
                                id: true
                            }
                        })];
                case 10:
                    aggregation = _c.sent();
                    paging = (0, utils_1.getMeta)(req.query, aggregation._count.id);
                    if (result.length)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result, paging: paging })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "contents not found" })];
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_1 = _c.sent();
                    (0, utils_1.handleError)(res, error_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); },
    create: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var body, subject, content, media, restBody, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    subject = body.subject, content = body.content, media = body.media, restBody = __rest(body, ["subject", "content", "media"]);
                    if (!subject || subject === "")
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "subject not in body" })];
                    if (!content || content === "")
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "content not in body" })];
                    if (!media || media === "")
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "media not in body" })];
                    return [4 /*yield*/, utils_1.prisma.news.create({
                            data: __assign({ subject: subject, content: content, media: media }, restBody)
                        })];
                case 1:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result })];
                    return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "unexpected error" })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, (0, utils_1.handleError)(res, error_2)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    "delete": function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.query.id;
                    if (!id || !id.length)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "no id in req params" })];
                    return [4 /*yield*/, utils_1.prisma.news.update({
                            where: { id: Number(id) },
                            data: { status: true }
                        })];
                case 1:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res })];
                    (0, utils_1.handleBadRequest)({ res: res, message: "unexpected error, delete failed" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, (0, utils_1.handleError)(res, error_3)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    update: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id, restData, result, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, id = _a.id, restData = __rest(_a, ["id"]);
                    if (!id || !restData)
                        return [2 /*return*/, (0, utils_1.handleBadRequest)({ res: res, message: "req body incomplete" })];
                    return [4 /*yield*/, utils_1.prisma.news.update({
                            where: { id: id },
                            data: restData
                        })];
                case 1:
                    result = _b.sent();
                    if (result)
                        return [2 /*return*/, (0, utils_1.handleSuccess)({ res: res, result: result })];
                    (0, utils_1.handleBadRequest)({ res: res, message: "unexpected error, modification failed" });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    (0, utils_1.handleError)(res, error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=news.controller.js.map