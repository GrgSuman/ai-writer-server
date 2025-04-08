import { Router } from "express";
import { getAllProjects,addNewProject, deleteProject, updateProject,getSingleProject } from "./projectController";

const router = Router();

router.get("/",getAllProjects);
router.post("/",addNewProject);
router.get("/:slug",getSingleProject);
router.put("/:id",updateProject);
router.delete("/:id",deleteProject);


export const projectRoute = router; 