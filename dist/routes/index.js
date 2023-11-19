"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_route_1 = __importDefault(require("./user.route"));
var category_route_1 = __importDefault(require("./category.route"));
var news_route_1 = __importDefault(require("./news.route"));
var upload_route_1 = __importDefault(require("./upload.route"));
var router = (0, express_1.Router)();
router.use('/users', user_route_1["default"]);
router.use('/categories', category_route_1["default"]);
router.use('/news', news_route_1["default"]);
router.use('/upload', upload_route_1["default"]);
exports["default"] = router;
//# sourceMappingURL=index.js.map