"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = __importDefault(require("./index"));
var dotenv_1 = require("dotenv");
var app = index_1["default"].app, server = index_1["default"].server;
(0, dotenv_1.config)();
var PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);
// run server depending on environment
if (process.env.NODE_ENV === "production") {
    // https
    //   .createServer(
    //     {
    //       // key: fs.readFileSync("/etc/letsencrypt/live/lfix.us/privkey.pem"),
    //       // cert: fs.readFileSync("/etc/letsencrypt/live/lfix.us/fullchain.pem"),
    //     },
    //     app
    //   )
    server.listen(PORT, function () {
        console.log("Server is running on production port ".concat(PORT));
    });
}
else {
    server.listen(PORT, function () {
        console.log("\n     \uD83D\uDE80 Server ready at: http://localhost:".concat(PORT, "\n     \u2B50\uFE0F See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api"));
    });
}
//# sourceMappingURL=server.js.map