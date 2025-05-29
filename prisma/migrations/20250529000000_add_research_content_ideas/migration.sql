-- CreateTable
CREATE TABLE "ResearchContentIdeas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "postFormat" TEXT NOT NULL,
    "whyGoodIdea" TEXT[],
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchContentIdeas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResearchContentIdeas_projectId_title_key" ON "ResearchContentIdeas"("projectId", "title");

-- AddForeignKey
ALTER TABLE "ResearchContentIdeas" ADD CONSTRAINT "ResearchContentIdeas_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;