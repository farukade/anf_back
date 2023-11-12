"use strict";
exports.__esModule = true;
var express_1 = require("express");
var news_controller_1 = require("../controllers/news.controller");
var middlewares_1 = require("../utils/middlewares");
var router = (0, express_1.Router)();
router.get('/', news_controller_1.NewsController.get);
router.post('/', (0, middlewares_1.authorize)([""]), news_controller_1.NewsController.create);
router["delete"]('/', (0, middlewares_1.authorize)([""]), news_controller_1.NewsController["delete"]);
router.patch('/', (0, middlewares_1.authorize)([""]), news_controller_1.NewsController.update);
exports["default"] = router;
//# sourceMappingURL=news.route.js.map