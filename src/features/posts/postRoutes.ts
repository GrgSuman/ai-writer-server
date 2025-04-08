import express from 'express';
import { addNewPost, deletePost, getAllPosts, getSinglePost, updatePost } from './postController';
import validateProject from '../../validators/validateProjectSlug';

const router = express.Router({ mergeParams: true });

router.get("/", validateProject, getAllPosts);
router.get("/:slug", validateProject, getSinglePost);
router.post("/", validateProject, addNewPost);
router.put("/:postId", validateProject, updatePost);
router.delete("/:postId", validateProject, deletePost);


export default router;