import express from 'express';
import { addNewPost, deletePost, getAllPosts, getSinglePost, getSinglePostBySlug, updatePost } from './postController';
import validateProject from '../../validators/validateProjectId';

const router = express.Router({ mergeParams: true });

router.get("/", validateProject, getAllPosts);
router.get("/:postId", validateProject, getSinglePost);
router.get("/slug/:postSlug", validateProject, getSinglePostBySlug);
router.post("/", validateProject, addNewPost);
router.put("/:postId", validateProject, updatePost);
router.delete("/:postId", validateProject, deletePost);


export default router;