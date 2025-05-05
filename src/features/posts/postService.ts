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

