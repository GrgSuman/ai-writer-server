import prisma from "../../lib/db";
import { Prisma } from "@prisma/client";
import formatDateTime from "../../lib/formatDateTime";
import AppError from "../../utils/appError";

export interface CreatePostInterface {
    title: string;
    slug: string;
    description: string;
    keywords: string;
    content: string;
    thumbnail?: string;
    author?: string;
    isDraft?: boolean;
    isUpdated?: boolean;
    isFeatured?: boolean;
    categoryId: string;
    projectId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

// Get all posts in a project including category and project
// This function is used to get all posts in a project including category and project
// It takes a projectId as a parameter and returns all posts in the project
// It returns all posts in the project
// @route GET /api/projects/:projectId/posts
const getAllPosts = async (projectId: string) => {
    const posts = await prisma.post.findMany({
            where: { projectId },
            include: {
            category: true,
            project: true
            },
            orderBy:{
                updatedAt: 'desc'
            }
    });
    if (!posts) {
        throw new AppError("No posts found", 404);
    }
    return posts;
}

// Get a single post in a project including category and project
// This function is used to get a single post in a project including category and project
// It takes a postId as a parameter and returns a single post in the project
// It returns a single post in the project
// @route GET /api/projects/:projectId/posts/:postId
const getSinglePost = async (postId: string) => {
    const post = await prisma.post.findUnique({
         where: { id: postId },
        include: {
             category: true,
              project: true
        }});
    if (!post) {
        throw new AppError("No post found", 404);
    }   
    return post;
}

// Get a single post in a project by slug
// This function is used to get a single post in a project by slug
// It takes a postSlug as a parameter and returns a single post in the project
// It returns a single post in the project
// @route GET /api/projects/:projectId/posts/slug/:postSlug
const getSinglePostBySlug = async (postSlug: string) => {
    const post = await prisma.post.findFirst({
         where: { slug: postSlug },
        include: {
             category: true,
              project: true
        }});

    if (!post) {
        throw new AppError("No post found", 404);
    }   
    return post;
}

// Add a new post in a project
// This function is used to add a new post in a project
// It takes a data object as a parameter and adds a new post in the project
// It returns the new post
// @route POST /api/projects/:projectId/posts
const addNewPost = async (data: CreatePostInterface) => {
    try {
        const newPost = await prisma.post.create({ data });
        return newPost;
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                throw new AppError("Post with this slug/title already exists", 400);
            }
        }
        throw new AppError("Error creating post", 400);
    }
}

// Update a post in a project
// This function is used to update a post in a project
// It takes a postId and data object as a parameter and updates the post in the project
// It returns the updated post
// @route PUT /api/projects/:projectId/posts/:postId
const updatePost = async (id: string, post: CreatePostInterface) => {
    try {
        const updatedPost = await prisma.post.update({ where: { id }, data: post });
        return updatedPost;
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                throw new AppError("Post with this slug/title already exists", 400);
            }
        }   
        console.log(error)
        throw new AppError("Error updating post", 400);
    }
}   

// Delete a post in a project
// This function is used to delete a post in a project
// It takes a postId as a parameter and deletes the post in the project
// It returns the deleted post
// @route DELETE /api/projects/:projectId/posts/:postId
const deletePost = async ( id: string) => {
    const deletedPost = await prisma.post.delete({ where: { id } });
    if (!deletedPost) {
        throw new AppError("Post not found", 404);
    }
    return deletedPost;
}

export default {
    getAllPosts,
    getSinglePost,
    getSinglePostBySlug,
    addNewPost,
    updatePost,
    deletePost
}

