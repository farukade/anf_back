"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getAllDatabaseTables = exports.generatePDF = exports.formatPhone = exports.getPercentage = exports.removeSpaces = exports.formatCurrency = exports.formatCurrencyBare = exports.toWords = exports.makePassword = exports.handleError = exports.handleBadRequest = exports.handleSuccess = exports.getMeta = exports.getPagination = exports.generateClientId = exports.prisma = void 0;
var dotenv_1 = require("dotenv");
var client_1 = require("@prisma/client");
var to_words_1 = require("to-words");
var numeral_1 = __importDefault(require("numeral"));
var logger_1 = require("./logger");
var util_1 = require("util");
var path_1 = require("path");
var fs_1 = require("fs");
var handlebars_1 = require("handlebars");
var execute_1 = require("@getvim/execute");
var crypto_1 = require("crypto");
var puppeteer_1 = require("puppeteer");
(0, dotenv_1.config)();
exports.prisma = new client_1.PrismaClient();
var DEFAULT_PAGE = 1;
var DEFAULT_PAGE_LIMIT = 10;
var generateClientId = function () { return (0, crypto_1.randomBytes)(32).toString("hex"); };
exports.generateClientId = generateClientId;
var getPagination = function (query) {
    var page = (query === null || query === void 0 ? void 0 : query.page) ? Math.abs(Number(query.page)) : DEFAULT_PAGE;
    var take = (query === null || query === void 0 ? void 0 : query.limit) ? Math.abs(Number(query.limit)) : DEFAULT_PAGE_LIMIT;
    var skip = (page - 1) * take;
    return {
        skip: skip,
        take: take
    };
};
exports.getPagination = getPagination;
var getMeta = function (query, total) {
    var take = (0, exports.getPagination)(query).take;
    var page = (query === null || query === void 0 ? void 0 : query.page) ? Math.abs(Number(query.page)) : DEFAULT_PAGE;
    return {
        currentPage: page,
        totalItems: total,
        itemsPerPage: take,
        totalPages: Math.ceil(total / take)
    };
};
exports.getMeta = getMeta;
var handleSuccess = function (responseObject) {
    var res = responseObject.res, code = responseObject.code, message = responseObject.message, paging = responseObject.paging, result = responseObject.result;
    var dataFound = result !== null || (result === null || result === void 0 ? void 0 : result.length);
    return res.status(code || 200).json({
        success: dataFound ? true : false,
        message: dataFound ? (message || "Success") : message || "No data",
        paging: paging,
        result: result
    });
};
exports.handleSuccess = handleSuccess;
var handleBadRequest = function (responseObject) {
    var res = responseObject.res, code = responseObject.code, message = responseObject.message, result = responseObject.result;
    logger_1.logger.error(message || "Unexpected error");
    return res.status(code || 400).json({
        success: false,
        message: message || "Failed",
        result: result
    });
};
exports.handleBadRequest = handleBadRequest;
var handleError = function (res, error) {
    logger_1.logger.error((error === null || error === void 0 ? void 0 : error.message) || "Unexpected error");
    return res.status(400).json({
        success: false,
        message: "Unexpected error"
    });
};
exports.handleError = handleError;
var makePassword = function (length) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var password = "";
    for (var i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
};
exports.makePassword = makePassword;
exports.toWords = new to_words_1.ToWords({
    localeCode: "en-US",
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: {
            // can be used to override defaults for the selected locale
            name: "Dollar",
            plural: "Dollar",
            symbol: "$",
            fractionalUnit: {
                name: "Cent",
                plural: "Cent",
                symbol: ""
            }
        }
    }
});
var formatCurrencyBare = function (amount, abs) {
    if (abs === void 0) { abs = false; }
    if (!amount) {
        return '0.00';
    }
    return "".concat((0, numeral_1["default"])(abs ? Math.abs(amount) : amount).format('0,0.00'));
};
exports.formatCurrencyBare = formatCurrencyBare;
var formatCurrency = function (amount, abs) {
    if (abs === void 0) { abs = false; }
    if (!amount) {
        return '₦0.0';
    }
    return "\u20A6".concat((0, numeral_1["default"])(abs ? Math.abs(amount) : amount).format('0,0.00'));
};
exports.formatCurrency = formatCurrency;
var removeSpaces = function (text) {
    return text.split(" ").join("");
};
exports.removeSpaces = removeSpaces;
var getPercentage = function (num, perc) {
    if (!num || isNaN(num)) {
        return 0;
    }
    if (isNaN(perc)) {
        return 0;
    }
    return (num / 100) * perc;
};
exports.getPercentage = getPercentage;
var formatPhone = function (num) {
    if (num[0] === '+') {
        return num;
    }
    else if (num[0] === '2' && num[1] === '3' && num[2] === '4') {
        return "+".concat(num);
    }
    else {
        var str = '+234';
        for (var i = 1; i < num.length; i++) {
            str += num[i];
        }
        return str;
    }
};
exports.formatPhone = formatPhone;
var generatePDF = function (template, data) { return __awaiter(void 0, void 0, void 0, function () {
    var readFileInstance, filepath, html, content, browser, os, _a, page, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                readFileInstance = (0, util_1.promisify)(fs_1.readFile);
                filepath = (0, path_1.resolve)(__dirname, "../../views/pdf_templates/".concat(template, ".hbs"));
                return [4 /*yield*/, readFileInstance(filepath, "utf-8")];
            case 1:
                html = _b.sent();
                content = (0, handlebars_1.compile)(html)(data);
                browser = void 0;
                return [4 /*yield*/, (0, execute_1.execute)('uname')];
            case 2:
                os = _b.sent();
                _a = os;
                switch (_a) {
                    case 'Linux': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, puppeteer_1.launch)({
                    executablePath: "/snap/bin/chromium",
                    headless: "new",
                    args: ['--no-sandbox']
                })];
            case 4:
                browser = _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, (0, puppeteer_1.launch)({
                    headless: "new",
                    args: ['--no-sandbox']
                })];
            case 6:
                browser = _b.sent();
                return [3 /*break*/, 7];
            case 7: return [4 /*yield*/, browser.newPage()];
            case 8:
                page = _b.sent();
                return [4 /*yield*/, page.setContent(content)];
            case 9:
                _b.sent();
                return [4 /*yield*/, page.emulateMediaType('screen')];
            case 10:
                _b.sent();
                return [4 /*yield*/, page.pdf({
                        path: data.filepath,
                        format: 'a4',
                        preferCSSPageSize: true
                    })];
            case 11:
                _b.sent();
                return [4 /*yield*/, browser.close()];
            case 12:
                _b.sent();
                return [3 /*break*/, 14];
            case 13:
                error_1 = _b.sent();
                logger_1.logger.error(error_1);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.generatePDF = generatePDF;
var getAllDatabaseTables = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tables, tableNames, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n       SELECT table_name\n      FROM information_schema.tables\n      WHERE table_schema = 'public';\n    "], ["\n       SELECT table_name\n      FROM information_schema.tables\n      WHERE table_schema = 'public';\n    "])))];
            case 1:
                tables = _a.sent();
                tableNames = Array.isArray(tables) ? tables.map(function (table) { return table.table_name; }) : [];
                return [2 /*return*/, tableNames];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching table names:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllDatabaseTables = getAllDatabaseTables;
var templateObject_1;
//# sourceMappingURL=utils.js.map