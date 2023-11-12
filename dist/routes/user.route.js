"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var middlewares_1 = require("../utils/middlewares");
var router = (0, express_1.Router)();
router.get('/', (0, middlewares_1.authorize)([""]), user_controller_1.UserController.get);
router.post('/', (0, middlewares_1.authorize)([""]), user_controller_1.UserController.create);
router.post('/login', user_controller_1.UserController.login);
router.post('/verify/login', (0, middlewares_1.authorize)([""]), user_controller_1.UserController.verifyToken);
router["delete"]('/', (0, middlewares_1.authorize)([""]), user_controller_1.UserController["delete"]);
router.patch('/', user_controller_1.UserController.update);
exports["default"] = router;
//# sourceMappingURL=user.route.js.map