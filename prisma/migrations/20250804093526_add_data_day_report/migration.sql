/*
  Warnings:

  - You are about to drop the column `outflowamount` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `outflowaverage` on the `DayReport` table. All the data in the column will be lost.
  - Added the required column `tdAmount` to the `DayReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tdAverage` to the `DayReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DayReport" DROP COLUMN "outflowamount",
DROP COLUMN "outflowaverage",
ADD COLUMN     "tdAmount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "tdAverage" DECIMAL(10,2) NOT NULL;
