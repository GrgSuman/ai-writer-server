import { Router } from "express";
import { getAllProjects,addNewProject, deleteProject, updateProject,getSingleProject } from "./projectController";

const router = Router();

router.route("/")
        .get(getAllProjects)
        .post(addNewProject);

router.route("/:id")
            .get(getSingleProject)
            .put(updateProject)
            .delete(deleteProject);


export const projectRoute = router; 