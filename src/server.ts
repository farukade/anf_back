import index from './index';
import { config } from 'dotenv';
const { app, server } = index;

config();
const PORT = process.env.PORT || 5000;

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
  server.listen(PORT, () => {
    console.log(`Server is running on production port ${PORT}`);
  });
} else {
  server.listen(PORT, () => {
    console.log(`
     🚀 Server ready at: http://localhost:${PORT}
     ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`);
  });
}