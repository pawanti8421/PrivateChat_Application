require("dotenv").config({ path: "./env" });
const connectDB = require("./db/db.js");
const app = require("./app.js");
const http = require("http");
const { Server } = require("socket.io");
const handleSocket = require("./controllers/socket.controllers.js");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN, credentials: true },
});

connectDB()
  .then(() => {
    handleSocket(io);

    server.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });
