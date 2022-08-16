/*
  Warnings:

  - The primary key for the `Calendars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Events` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calendars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Calendars_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calendars" ("authorId", "color", "id", "name") SELECT "authorId", "color", "id", "name" FROM "Calendars";
DROP TABLE "Calendars";
ALTER TABLE "new_Calendars" RENAME TO "Calendars";
CREATE UNIQUE INDEX "Calendars_id_key" ON "Calendars"("id");
CREATE UNIQUE INDEX "Calendars_name_key" ON "Calendars"("name");
CREATE TABLE "new_Events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "time" TEXT,
    "desc" TEXT NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Events_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("authorId", "calendarId", "date", "desc", "id", "time") SELECT "authorId", "calendarId", "date", "desc", "id", "time" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
CREATE UNIQUE INDEX "Events_id_key" ON "Events"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
