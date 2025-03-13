import express from 'express';
import { generateAIPost, generateOutline, generateSummary } from './postgptController';

const router = express.Router();

router.post('/summarize', generateSummary);

router.post('/generate-outline', generateOutline);

router.post('/generate-post', generateAIPost);

export const postgptRoute = router