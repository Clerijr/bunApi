-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
