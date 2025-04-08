/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Post_slug_key";

-- DropIndex
DROP INDEX "Post_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_projectId_name_key" ON "Category"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_projectId_slug_key" ON "Category"("projectId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_projectId_title_key" ON "Post"("projectId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_projectId_slug_key" ON "Post"("projectId", "slug");
