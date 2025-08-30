import express from "express";
import { enhanceProjectDescription, generateCategoriesSuggestions, generateContent, generateProjectTips, getContentIdeas } from "./ai.controller";


const router = express.Router();

router.post('/enhance-project-description',enhanceProjectDescription)
router.post('/category-suggestions',generateCategoriesSuggestions)
router.post('/content-ideas',getContentIdeas)
router.post('/generate-content',generateContent)
router.post('/project-tips',generateProjectTips)

export default router