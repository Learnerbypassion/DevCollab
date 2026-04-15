import { Server } from "socket.io";
import jwt from "jsonwebtoken";
// import chatSocket from "./chat.socket.js";

async function initSocket(server) {

  const io = new Server(server);

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(" ")[1];
      console.log("Token", socket.handshake.headers);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`New user is connected ${socket.id}`);
    
  });
}

export default initSocket