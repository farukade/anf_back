"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var express_handlebars_1 = require("express-handlebars");
var path_1 = require("path");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var middlewares_1 = require("./utils/middlewares");
var utils_1 = require("./utils/utils");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var gateway_1 = require("./gateway");
var app = (0, express_1["default"])();
var allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://174.138.37.165:90",
    "http://174.138.37.165:92",
];
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({
    extended: true,
    limit: 100000
}));
app.use((0, cookie_parser_1["default"])());
app.use(express_1["default"].static((0, path_1.join)(__dirname, "../public")));
app.engine('handlebars', (0, express_handlebars_1.engine)({ extname: '.hbs' }));
app.set('view engine', 'handlebars');
app.set('views', (0, path_1.join)(__dirname, '../views'));
app.use(middlewares_1.loggerMiddleware);
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         let msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
app.use((0, cors_1["default"])());
/* Routes */
app.use(routes_1["default"]);
app.use(function (req, res) {
    return (0, utils_1.handleBadRequest)({ res: res, code: 404, message: "Endpoint not found!" });
});
var server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server);
(0, gateway_1.initSocket)();
exports["default"] = { server: server, app: app };
//# sourceMappingURL=index.js.map