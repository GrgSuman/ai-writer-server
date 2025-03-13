import express from 'express';
import { addNewCategory, deleteCategory, getAllCategories, getAllPosts, getSingleCategory, getSinglePost, updateCategory } from './postController';

const router = express.Router({ mergeParams: true });

router.route('/categories')
.get( getAllCategories)
.post(addNewCategory);

router.route('/categories/:categoryId')
.get(getSingleCategory)
.put(updateCategory)
.delete(deleteCategory);

router.route('/posts')
.get(getAllPosts)
// .post(addNewPost);

router.route('/posts/:slug')
.get(getSinglePost)
// .post(updatePost)
// .delete(deletePost);

export const postRoute = router