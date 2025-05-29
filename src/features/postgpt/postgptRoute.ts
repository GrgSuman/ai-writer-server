import express from 'express';
import { generateAIPost, generateOutline, generateSummary, generateTitleIdeas } from './postgptController';

const router = express.Router();

router.post('/summarize', generateSummary);

router.post('/generate-outline', generateOutline);

router.post('/generate-post', generateAIPost);

router.post('/title-ideas', generateTitleIdeas);

export const postgptRoute = router