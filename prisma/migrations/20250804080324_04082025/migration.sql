/*
  Warnings:

  - Added the required column `averageOutflow` to the `DayReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalOutflow` to the `DayReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DayReport" ADD COLUMN     "averageOutflow" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalOutflow" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Power" ADD COLUMN     "deadLevel" DECIMAL(10,2),
ADD COLUMN     "fullLevel" DECIMAL(10,2),
ADD COLUMN     "totalActiveDead" DECIMAL(10,2),
ADD COLUMN     "totalActiveFull" DECIMAL(10,2),
ADD COLUMN     "totalStorageDead" DECIMAL(10,2),
ADD COLUMN     "totalStorageFull" DECIMAL(10,2);
