import { Router } from "express";
import {  getResearchContentIdeas, addResearchContentIdeas,updateResearchContentIdeas, deleteResearchContentIdeas } from "./researchController";

const router = Router({ mergeParams: true });


router.get("/",getResearchContentIdeas);
router.post("/",addResearchContentIdeas);
router.put("/:researchContentIdeasId",updateResearchContentIdeas)
router.delete("/:researchContentIdeasId",deleteResearchContentIdeas);

export const researchRoute = router; 