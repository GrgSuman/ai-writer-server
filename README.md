# Blog Gen AI

A powerful backend API for a blog platform that leverages AI for content generation and management. This project provides a robust foundation for creating, managing, and organizing blog content with features for projects, categories, and posts.

## Features

- **Project Management**: Create and manage multiple blog projects
- **Category Organization**: Organize content with customizable categories
- **Post Management**: Create, update, and delete blog posts
- **AI-Powered Content Generation**: Generate blog content using AI
- **Authentication**: Secure API with user authentication
- **Web Scraping**: Extract content from web pages
- **RESTful API**: Clean, consistent API design

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Type-safe JavaScript
- **Prisma**: ORM for database access
- **Google Generative AI**: AI content generation
- **Playwright**: Web scraping
- **JWT**: Authentication
- **Docker**: Containerization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional)
- Google AI API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-gen-ai.git
   cd blog-gen-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret"
   GOOGLE_AI_API_KEY="your_google_ai_api_key"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

All API endpoints (except `/api/auth`) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

### Projects

- **GET /api/projects**: Get all projects
- **GET /api/projects/:projectId**: Get a single project
- **POST /api/projects**: Create a new project
- **PUT /api/projects/:projectId**: Update a project
- **DELETE /api/projects/:projectId**: Delete a project

### Categories

- **GET /api/projects/:projectId/categories**: Get all categories in a project
- **GET /api/projects/:projectId/categories/:categoryId**: Get a single category
- **POST /api/projects/:projectId/categories**: Create a new category
- **PUT /api/projects/:projectId/categories/:categoryId**: Update a category
- **DELETE /api/projects/:projectId/categories/:categoryId**: Delete a category

### Posts

- **GET /api/projects/:projectId/posts**: Get all posts in a project
- **GET /api/projects/:projectId/posts/:postId**: Get a single post
- **POST /api/projects/:projectId/posts**: Create a new post
- **PUT /api/projects/:projectId/posts/:postId**: Update a post
- **DELETE /api/projects/:projectId/posts/:postId**: Delete a post

### AI Content Generation

- **POST /api/postgpt**: Generate blog content using AI

### Web Scraping

- **GET /scrape?url=**: Scrape content from a web page

## Project Structure

```
blog-gen-ai/
├── src/
│   ├── features/           # Feature modules
│   │   ├── auth/           # Authentication
│   │   ├── projects/       # Project management
│   │   ├── categories/     # Category management
│   │   ├── posts/          # Post management
│   │   └── postgpt/        # AI content generation
│   ├── middlewares/        # Express middlewares
│   ├── validators/         # Request validators
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── lib/                # Library code
│   ├── scraper/            # Web scraping functionality
│   └── index.ts            # Application entry point
├── prisma/                 # Database schema and migrations
├── dist/                   # Compiled JavaScript
├── .env                    # Environment variables
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
└── Dockerfile              # Docker configuration
```

## Development

### Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the project
- `npm start`: Start the production server
- `npm test`: Run tests (not implemented yet)

### Docker

Build and run with Docker:

```bash
docker build -t blog-gen-ai .
docker run -p 8000:8000 blog-gen-ai
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Acknowledgements

- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Google Generative AI](https://ai.google.dev/)
- [Playwright](https://playwright.dev/) 