"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../utils/middlewares");
var utils_1 = require("../utils/utils");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var serverDomain = process.env.SERVER_DOMAIN;
var uploadRouter = (0, express_1.Router)();
uploadRouter.post("/", (0, middlewares_1.authorize)([""]), middlewares_1.upload, function (req, res) {
    var _a, _b;
    try {
        var files = req.files;
        if (files && ((_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename)) {
            return (0, utils_1.handleSuccess)({ res: res, result: { url: "".concat(serverDomain, "/uploads/").concat((_b = files[0]) === null || _b === void 0 ? void 0 : _b.filename) } });
        }
        else {
            return (0, utils_1.handleBadRequest)({ res: res, message: "Error: File | file name not found!" });
        }
    }
    catch (error) {
        return (0, utils_1.handleError)(res, error);
    }
});
exports["default"] = uploadRouter;
//# sourceMappingURL=upload.route.js.map