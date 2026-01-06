/*
  Warnings:

  - You are about to drop the column `decACknowAt` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `decACknowAt` on the `MonthPower` table. All the data in the column will be lost.
  - You are about to drop the column `decACknowAt` on the `WeekPower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DayPower" DROP COLUMN "decACknowAt",
ADD COLUMN     "decAcknowAt" TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "MonthPower" DROP COLUMN "decACknowAt",
ADD COLUMN     "decAcknowAt" TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "WeekPower" DROP COLUMN "decACknowAt",
ADD COLUMN     "decAcknowAt" TIMESTAMPTZ(0);
