/*
  Warnings:

  - You are about to drop the column `wordsId` on the `Challenge` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    CONSTRAINT "Challenge_topicSlug_fkey" FOREIGN KEY ("topicSlug") REFERENCES "Topic" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("description", "slug", "title", "topicSlug") SELECT "description", "slug", "title", "topicSlug" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
