# Blog Gen AI API Documentation

## Categories API

Categories are used to organize posts within a project. All category endpoints are scoped to a specific project.

### Get All Categories in a Project

Retrieves all categories for a specific project.

- **URL**: `/api/projects/:projectId/categories`
- **Method**: `GET`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Success",
    "data": [
      {
        "id": "string",
        "name": "string",
        "projectId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```

### Get Single Category

Retrieves a specific category by ID.

- **URL**: `/api/projects/:projectId/categories/:categoryId`
- **Method**: `GET`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
  - `categoryId`: ID of the category
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Success",
    "data": {
      "id": "string",
      "name": "string",
      "projectId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Category not found"
  }
  ```

### Create Category

Creates a new category in a project.

- **URL**: `/api/projects/:projectId/categories`
- **Method**: `POST`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Category created successfully",
    "data": {
      "id": "string",
      "name": "string",
      "projectId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Category name is required"
  }
  ```

### Update Category

Updates an existing category.

- **URL**: `/api/projects/:projectSlug/categories/:categoryId`
- **Method**: `PUT`
- **Access**: Public
- **URL Params**: 
  - `projectSlug`: Slug of the project
  - `categoryId`: ID of the category
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Category updated successfully",
    "data": {
      "id": "string",
      "name": "string",
      "projectId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

### Delete Category

Deletes a category from a project.

- **URL**: `/api/projects/:projectSlug/categories/:categoryId`
- **Method**: `DELETE`
- **Access**: Public
- **URL Params**: 
  - `projectSlug`: Slug of the project
  - `categoryId`: ID of the category
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Category deleted successfully",
    "data": {
      "id": "string",
      "name": "string",
      "projectId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

## Posts API

Posts are the main content of your blog, organized within categories and projects.

### Get All Posts in a Project

Retrieves all posts for a specific project.

- **URL**: `/api/projects/:projectId/posts`
- **Method**: `GET`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Success",
    "data": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "description": "string",
        "keywords": "string",
        "content": "string",
        "projectId": "string",
        "categoryId": "string",
        "author": "string",
        "thumbnail": "string",
        "isDraft": "boolean",
        "isUpdated": "boolean",
        "isFeatured": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```

### Get Single Post

Retrieves a specific post by ID.

- **URL**: `/api/projects/:projectId/posts/:postId`
- **Method**: `GET`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
  - `postId`: ID of the post
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Success",
    "data": {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "keywords": "string",
      "content": "string",
      "projectId": "string",
      "categoryId": "string",
      "author": "string",
      "thumbnail": "string",
      "isDraft": "boolean",
      "isUpdated": "boolean",
      "isFeatured": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

### Create Post

Creates a new post in a project and category.

- **URL**: `/api/projects/:projectId/posts`
- **Method**: `POST`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
- **Request Body**:
  ```json
  {
    "title": "string",
    "slug": "string",
    "description": "string",
    "keywords": "string",
    "content": "string",
    "categoryId": "string",
    "author": "string",
    "thumbnail": "string",
    "isDraft": "boolean",
    "isUpdated": "boolean",
    "isFeatured": "boolean",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Post created successfully",
    "data": {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "keywords": "string",
      "content": "string",
      "projectId": "string",
      "categoryId": "string",
      "author": "string",
      "thumbnail": "string",
      "isDraft": "boolean",
      "isUpdated": "boolean",
      "isFeatured": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Missing required fields: title, slug, description, keywords, content, categoryId"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Category with ID {categoryId} not found"
  }
  ```

### Update Post

Updates an existing post.

- **URL**: `/api/projects/:projectId/posts/:postId`
- **Method**: `PUT`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
  - `postId`: ID of the post
- **Request Body**:
  ```json
  {
    "title": "string",
    "slug": "string",
    "description": "string",
    "keywords": "string",
    "content": "string",
    "categoryId": "string",
    "author": "string",
    "thumbnail": "string",
    "isDraft": "boolean",
    "isUpdated": "boolean",
    "isFeatured": "boolean",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Post updated successfully",
    "data": {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "keywords": "string",
      "content": "string",
      "projectId": "string",
      "categoryId": "string",
      "author": "string",
      "thumbnail": "string",
      "isDraft": "boolean",
      "isUpdated": "boolean",
      "isFeatured": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Missing required fields: title, slug, description, keywords, content, categoryId"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Category with ID {categoryId} not found"
  }
  ```

### Delete Post

Deletes a post from a project.

- **URL**: `/api/projects/:projectId/posts/:postId`
- **Method**: `DELETE`
- **Access**: Public
- **URL Params**: 
  - `projectId`: ID of the project
  - `postId`: ID of the post
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Post deleted successfully",
    "data": {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "keywords": "string",
      "content": "string",
      "projectId": "string",
      "categoryId": "string",
      "author": "string",
      "thumbnail": "string",
      "isDraft": "boolean",
      "isUpdated": "boolean",
      "isFeatured": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

## Error Handling

All API endpoints use a consistent error response format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error
