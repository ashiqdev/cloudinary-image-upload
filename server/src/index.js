require("dotenv").config();
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

server.start(
  {
    port: 4444,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(
      `Server is now listening on port http://localhost:${deets.port}`
    );
  }
);
