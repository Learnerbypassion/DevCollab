import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import projectRoutes from "./routes/project.routes.js"
import collabRoutes from "./routes/collab.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true })); // for form submissions
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/collab', collabRoutes)
app.use('/api/chat', chatRoutes)
app.get('/', (req, res)=>{
    res.send("This is backend of Dev-Collab");
    
})

export default app;