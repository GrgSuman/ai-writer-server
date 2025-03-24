import express from 'express';
import { addNewPost, getAllPosts, getSinglePost } from './postController';

const router = express.Router({ mergeParams: true });

router.get("/", getAllPosts);
router.get("/:slug", getSinglePost);
router.post("/", addNewPost);


export default router;