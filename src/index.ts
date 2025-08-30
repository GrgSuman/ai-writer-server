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
import { researchRoute } from "./features/research/researchRoute";
import path from "path";
import aiRoutes from "./features/ai/ai.routes";
import { googleRelatedQueries, googleTrendsData } from "./lib/ai/tools";


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
app.use("/api/v1/auth", authRoutes);

// projects api routes
app.use("/api/v1/projects", verifyUser, projectRoute);

// (categories,posts,research) under a specific project
app.use("/api/v1/projects/:projectId/categories", verifyUser, validateProject, categoryRoute);
app.use('/api/v1/projects/:projectId/posts',verifyUser, validateProject, postRoute); 
app.use('/api/v1/projects/:projectId/research-content-ideas',verifyUser, validateProject, researchRoute);

// postgpt api routes
app.use("/api/v1/postgpt", verifyUser, postgptRoute);

// ai api routes
app.use("/api/v1/ai", aiRoutes);

// Serves /docs/* from the src/docs folder
app.use('/docs', express.static(path.join(__dirname, 'docs'), { index: 'index.html' }));

app.get("/",async (req, res) => {
    const keywords = ['javascript', 'python','cv','resume builder']
    // const data = await googleTrendsData()
    const data = await googleRelatedQueries(keywords)
    res.json({
        "message": "Hello World",
        "data": data
    });
})

app.get("/writecms-docs", (req, res) => {
    res.sendFile(path.join(__dirname, "docs", "index.html"));
})


const PORT = process.env.PORT || 8000

app.get("/scrape", verifyUser, async (req, res) => {
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