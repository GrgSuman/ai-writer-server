import prisma from "../../lib/db";

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
    try {
        const posts = await prisma.post.findMany({ where: { projectId } });
        return posts;
    } catch (error) {
        throw new Error("Error fetching posts");
    }
}

const getSinglePost = async (projectId: string, slug: string) => {
    try {
        const post = await prisma.post.findUnique({ where: { slug, projectId } });
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
        throw new Error("Error creating post");
    }
}

const updatePost = async (id: string, post: CreatePostInterface) => {
    try {
        const updatedPost = await prisma.post.update({ where: { id }, data: post });
        return updatedPost;
    } catch (error) {
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

