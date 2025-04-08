import prisma from "../../lib/db";
import { Prisma } from "@prisma/client";
import formatDateTime from "../../lib/formatDateTime";

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

const getAllPosts = async (projectSlug: string) => {
    try {
        const posts = await prisma.post.findMany({
             where: { projectId:projectSlug },
             include: {
                category: true,
                project: true
             }
        });
        return posts;
    } catch (error) {
        throw new Error("Error fetching posts");
    }
}

const getSinglePost = async (projectId: string, slug: string) => {
    try {
        const post = await prisma.post.findFirst({ where: { slug, projectId }, include: { category: true, project: true } });
        return post;
    } catch (error) {
        throw new Error("Error fetching post");
    }
}

const addNewPost = async (data: CreatePostInterface) => {
    try {
        const newPost = await prisma.post.create({ data });
        return newPost;
    } catch (error) {
        console.log("error", error);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                throw new Error("Post with this slug already exists");
            }
        }
        throw new Error("Error creating post");
    }
}

const updatePost = async (id: string, post: CreatePostInterface) => {
    const formattedPost = {
        ...post,
        createdAt: new Date(post.createdAt || ""),
        updatedAt: new Date(post.updatedAt || "")
    }
    console.log(formattedPost)
    try {
        const updatedPost = await prisma.post.update({ where: { id }, data: formattedPost });
        return updatedPost;
    } catch (error) {
        console.log("error", error);
        throw new Error("Error updating post");
    }
}   

const deletePost = async (projectId: string, id: string) => {
    try {
        const deletedPost = await prisma.post.delete({ where: { id, projectId } });
        return deletedPost;
    } catch (error) {
        throw new Error("Error deleting post");
    }
}

export default {
    getAllPosts,
    getSinglePost,
    addNewPost,
    updatePost,
    deletePost
}

