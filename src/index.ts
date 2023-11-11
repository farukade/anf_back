import express from 'express';
import cors from 'cors';
import allRoutes from './routes';
import { engine } from 'express-handlebars';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { loggerMiddleware } from './utils/middlewares';
import { handleBadRequest } from './utils/utils';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initSocket } from './gateway';

const app = express()

let allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://174.138.37.165:90",
  "http://174.138.37.165:92",
];

app.use(express.json())
app.use(express.urlencoded({
  extended: true,
  limit: 100000,
}));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));

app.engine('handlebars', engine({ extname: '.hbs' }));
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, '../views'));

app.use(loggerMiddleware);

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

app.use(cors());

/* Routes */
app.use(allRoutes);


app.use(function (req, res) {
  return handleBadRequest({ res, code: 404, message: "Endpoint not found!" });
});

const server = createServer(app);
export const io = new Server(server);

initSocket();

export default { server, app };

