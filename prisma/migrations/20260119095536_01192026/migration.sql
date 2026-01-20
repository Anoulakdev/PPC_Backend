/*
  Warnings:

  - You are about to drop the column `bossAknow` on the `Power` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Power" DROP COLUMN "bossAknow",
ADD COLUMN     "bossAcknow" BOOLEAN NOT NULL DEFAULT false;
