import { Router } from "express";
import { getAllProjects,addNewProject, deleteProject, updateProject,getSingleProject, getResearchContentIdeas, addResearchContentIdeas, deleteResearchContentIdeas } from "./projectController";
import validateProject from "../../validators/validateProjectId";

const router = Router();

router.get("/",getAllProjects);
router.post("/",addNewProject);
router.get("/:projectId",validateProject,getSingleProject);
router.put("/:projectId",validateProject,updateProject);
router.delete("/:projectId",validateProject,deleteProject);
router.get("/:projectId/research-content-ideas",validateProject,getResearchContentIdeas);
router.post("/:projectId/research-content-ideas",validateProject,addResearchContentIdeas);
router.delete("/:projectId/research-content-ideas/:researchContentIdeasId",validateProject,deleteResearchContentIdeas);

export const projectRoute = router; 