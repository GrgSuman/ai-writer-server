import { Router } from "express";
import { getAllProjects,addNewProject, deleteProject, updateProject,getSingleProject } from "./projectController";
import validateProject from "../../validators/validateProjectId";

const router = Router();

router.get("/",getAllProjects);
router.post("/",addNewProject);
router.get("/:projectId",validateProject,getSingleProject);
router.put("/:projectId",validateProject,updateProject);
router.delete("/:projectId",validateProject,deleteProject);


export const projectRoute = router; 