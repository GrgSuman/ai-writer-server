import express from "express";
import dotenv from "dotenv";
import { webContents } from "./scraper/scraper";
import cors from 'cors'
import logger from 'morgan'

import { postgptRoute } from "./features/postgpt/postgptRoute";
import { projectRoute } from "./features/projects/projectRoute";
import { errorHandler } from "./middlewares/errorMiddleWare";

import  postRoute  from "./features/posts/postRoutes";
import categoryRoute from "./features/categories/categoryRoute";
import validateProject from "./validators/validateProjectId";
import authRoutes from "./features/auth/authRoute";
import cookieParser from "cookie-parser";
import { verifyUser } from "./middlewares/verifyUser";


dotenv.config();
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(logger('dev'));


//auth routes
app.use("/api/auth", authRoutes);

// projects api routes
app.use("/api/projects", verifyUser, projectRoute);
// categories api under project
app.use("/api/projects/:projectId/categories", verifyUser, validateProject, categoryRoute);
// posts api routes under project
app.use('/api/projects/:projectId/posts',verifyUser, validateProject, postRoute); // Posts under a specific project

// postgpt api routes
app.use("/api/postgpt", postgptRoute);

app.get("/", (req, res) => {
    res.json({
        "message": "Hello World"
    });
})


const PORT = process.env.PORT || 8000

app.get("/scrape", async (req, res) => {
    const url = req.query.url as string;
    if (!url) {
        res.status(400).json({
            "message": "URL is required"
        });
    }
    const content = await webContents(url);
    res.json(content);
})

// Global Error Middleware (ALWAYS at the bottom)
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
})

// Gracefully handle shutdown when Nodemon restarts
process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => {
      console.log("Server shut down. Exiting process..");
      process.exit(0);
    });
  });