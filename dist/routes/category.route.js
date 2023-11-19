"use strict";
exports.__esModule = true;
var express_1 = require("express");
var category_controller_1 = require("../controllers/category.controller");
var middlewares_1 = require("../utils/middlewares");
var router = (0, express_1.Router)();
router.get('/', (0, middlewares_1.authorize)([""]), category_controller_1.CategoryController.get);
router.post('/', (0, middlewares_1.authorize)([""]), category_controller_1.CategoryController.create);
router["delete"]('/', (0, middlewares_1.authorize)([""]), category_controller_1.CategoryController["delete"]);
router.patch('/', (0, middlewares_1.authorize)([""]), category_controller_1.CategoryController.update);
exports["default"] = router;
//# sourceMappingURL=category.route.js.map