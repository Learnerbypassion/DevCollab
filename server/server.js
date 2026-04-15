import http from "http"
import app from "./src/app.js"
import connectDB from "./src/config/db.js";
import initSocket from "./src/sockets/index.js";

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
initSocket(server);

connectDB()
server.listen(PORT , ()=>{
    console.log("The server is running " + PORT);
    console.log("http://localhost:" + PORT);
})