export type CategoryInput = {
    name: string;
    posts: string[];
};
  
export type BrainstormInput = {
    description: string;
    categoriesWithPosts: CategoryInput[];
    query: string;
};