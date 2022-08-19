/*
  Warnings:

  - You are about to drop the column `eventsId` on the `Calendars` table. All the data in the column will be lost.
  - You are about to drop the column `calendarsId` on the `Events` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Calendars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calendarId` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calendars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Calendars_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calendars" ("color", "id", "name") SELECT "color", "id", "name" FROM "Calendars";
DROP TABLE "Calendars";
ALTER TABLE "new_Calendars" RENAME TO "Calendars";
CREATE UNIQUE INDEX "Calendars_name_key" ON "Calendars"("name");
CREATE TABLE "new_Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT,
    "desc" TEXT NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Events_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("authorId", "date", "desc", "id", "time") SELECT "authorId", "date", "desc", "id", "time" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
