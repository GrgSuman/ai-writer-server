// Static API route definitions for documentation
// Keep this structure: groups -> routes[] with method, path, needs, returns, notes

const API_BASE = 'http://localhost:8000/api/v1';

export const apiDocs = [
	{
		group: 'Auth',
		description: 'Authentication and API keys',
		routes: [
			{
				method: 'POST',
				path: '/auth/login',
				fullPath: `${API_BASE}/auth/login`,
				needs: 'body { token: string (Google ID token) }',
				returns: '200: JWT token string',
				notes: 'Public. Exchanges Google ID token for app JWT.'
			},
			{
				method: 'GET',
				path: '/auth/get-api-key',
				fullPath: `${API_BASE}/auth/get-api-key`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: { id, key, isActive, userId, createdAt } | null',
				notes: 'Private. Returns user API key if exists.'
			},
			{
				method: 'POST',
				path: '/auth/generate-api-key',
				fullPath: `${API_BASE}/auth/generate-api-key`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: created API key record',
				notes: 'Private. Creates and returns an API key; unique per user.'
			}
		]
	},
	{
		group: 'Projects',
		description: 'Manage projects',
		routes: [
			{
				method: 'GET',
				path: '/projects',
				fullPath: `${API_BASE}/projects`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Project[]',
				notes: 'List projects for authenticated user.'
			},
			{
				method: 'POST',
				path: '/projects',
				fullPath: `${API_BASE}/projects`,
				needs: 'Authorization: Bearer <JWT>; body { name: string }',
				returns: '201: Project',
				notes: 'Create a new project.'
			},
			{
				method: 'GET',
				path: '/projects/:projectId',
				fullPath: `${API_BASE}/projects/:projectId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Project | 404',
				notes: 'Get single project by id.'
			},
			{
				method: 'PUT',
				path: '/projects/:projectId',
				fullPath: `${API_BASE}/projects/:projectId`,
				needs: 'Authorization: Bearer <JWT>; body { name, description, systemPrompt }',
				returns: '200: Project',
				notes: 'Update project fields.'
			},
			{
				method: 'DELETE',
				path: '/projects/:projectId',
				fullPath: `${API_BASE}/projects/:projectId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '204: No Content',
				notes: 'Delete project.'
			}
		]
	},
	{
		group: 'Categories',
		description: 'Manage categories within a project',
		routes: [
			{
				method: 'GET',
				path: '/projects/:projectId/categories',
				fullPath: `${API_BASE}/projects/:projectId/categories`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Category[]',
				notes: 'List categories in a project.'
			},
			{
				method: 'POST',
				path: '/projects/:projectId/categories',
				fullPath: `${API_BASE}/projects/:projectId/categories`,
				needs: 'Authorization: Bearer <JWT>; body { name }',
				returns: '201: Category',
				notes: 'Create a category in project.'
			},
			{
				method: 'GET',
				path: '/projects/:projectId/categories/:categoryId',
				fullPath: `${API_BASE}/projects/:projectId/categories/:categoryId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Category | 404',
				notes: 'Get category by id.'
			},
			{
				method: 'GET',
				path: '/projects/:projectId/categories/slug/:categorySlug',
				fullPath: `${API_BASE}/projects/:projectId/categories/slug/:categorySlug`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Category | 404',
				notes: 'Get category by slug.'
			},
			{
				method: 'PUT',
				path: '/projects/:projectId/categories/:categoryId',
				fullPath: `${API_BASE}/projects/:projectId/categories/:categoryId`,
				needs: 'Authorization: Bearer <JWT>; body { name }',
				returns: '200: Category',
				notes: 'Update category.'
			},
			{
				method: 'DELETE',
				path: '/projects/:projectId/categories/:categoryId',
				fullPath: `${API_BASE}/projects/:projectId/categories/:categoryId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '204: No Content',
				notes: 'Delete category.'
			}
		]
	},
	{
		group: 'Posts',
		description: 'Manage posts within a project',
		routes: [
			{
				method: 'GET',
				path: '/projects/:projectId/posts',
				fullPath: `${API_BASE}/projects/:projectId/posts`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Post[]',
				notes: 'List posts in project.'
			},
			{
				method: 'POST',
				path: '/projects/:projectId/posts',
				fullPath: `${API_BASE}/projects/:projectId/posts`,
				needs: 'Authorization: Bearer <JWT>; body { title, slug, description, keywords, content, categoryId, ... }',
				returns: '201: Post',
				notes: 'Create a post.'
			},
			{
				method: 'GET',
				path: '/projects/:projectId/posts/:postId',
				fullPath: `${API_BASE}/projects/:projectId/posts/:postId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Post | 404',
				notes: 'Get post by id.'
			},
			{
				method: 'GET',
				path: '/projects/:projectId/posts/slug/:postSlug',
				fullPath: `${API_BASE}/projects/:projectId/posts/slug/:postSlug`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: Post | 404',
				notes: 'Get post by slug.'
			},
			{
				method: 'PUT',
				path: '/projects/:projectId/posts/:postId',
				fullPath: `${API_BASE}/projects/:projectId/posts/:postId`,
				needs: 'Authorization: Bearer <JWT>; body like POST',
				returns: '200: Post',
				notes: 'Update post.'
			},
			{
				method: 'DELETE',
				path: '/projects/:projectId/posts/:postId',
				fullPath: `${API_BASE}/projects/:projectId/posts/:postId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '204: No Content',
				notes: 'Delete post.'
			}
		]
	},
	{
		group: 'Research',
		description: 'Research content ideas within a project',
		routes: [
			{
				method: 'GET',
				path: '/projects/:projectId/research-content-ideas',
				fullPath: `${API_BASE}/projects/:projectId/research-content-ideas`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '200: ResearchContentIdea[]',
				notes: 'List research content ideas.'
			},
			{
				method: 'POST',
				path: '/projects/:projectId/research-content-ideas',
				fullPath: `${API_BASE}/projects/:projectId/research-content-ideas`,
				needs: 'Authorization: Bearer <JWT>; body { title, keywords, description, wordCount:number, postFormat, whyGoodIdea[] }',
				returns: '201: ResearchContentIdea',
				notes: 'Create research content idea.'
			},
			{
				method: 'PUT',
				path: '/projects/:projectId/research-content-ideas/:researchContentIdeasId',
				fullPath: `${API_BASE}/projects/:projectId/research-content-ideas/:researchContentIdeasId`,
				needs: 'Authorization: Bearer <JWT>; body like POST',
				returns: '200: ResearchContentIdea',
				notes: 'Update research content idea.'
			},
			{
				method: 'DELETE',
				path: '/projects/:projectId/research-content-ideas/:researchContentIdeasId',
				fullPath: `${API_BASE}/projects/:projectId/research-content-ideas/:researchContentIdeasId`,
				needs: 'Authorization: Bearer <JWT>',
				returns: '204: No Content',
				notes: 'Delete research content idea.'
			}
		]
	},
	{
		group: 'PostGPT',
		description: 'AI-powered content generation endpoints',
		routes: [
			{
				method: 'POST',
				path: '/postgpt/summarize',
				fullPath: `${API_BASE}/postgpt/summarize`,
				needs: 'body { content: string }',
				returns: '200: string (summary)',
				notes: 'Summarize provided content.'
			},
			{
				method: 'POST',
				path: '/postgpt/generate-outline',
				fullPath: `${API_BASE}/postgpt/generate-outline`,
				needs: 'body { title, description, keywords, wordCount:number, writingStyle, summaryContents? }',
				returns: '200: outline string',
				notes: 'Generate outline for a blog post.'
			},
			{
				method: 'POST',
				path: '/postgpt/generate-post',
				fullPath: `${API_BASE}/postgpt/generate-post`,
				needs: "body { data: { topic, category, keyPoints, keywords, audience, goal, tone, format, wordCount, referenceSources, additionalInstructions } }",
				returns: '200: { title, description, keywords, content }',
				notes: 'Generate a full blog post as JSON.'
			},
			{
				method: 'POST',
				path: '/postgpt/title-ideas',
				fullPath: `${API_BASE}/postgpt/title-ideas`,
				needs: 'body { keywords: string }',
				returns: '200: { contentIdeas: [...] }',
				notes: 'Generate title ideas and strategy.'
			}
		]
	}
];

// UMD export for plain browser
window.apiDocs = apiDocs;


