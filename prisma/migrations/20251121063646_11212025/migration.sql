/*
  Warnings:

  - Added the required column `totalDischargeamount` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDischargeaverage` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDischargeamount` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDischargeaverage` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDischargeamount` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDischargeaverage` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DayCurrent" ADD COLUMN     "totalDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "totalDischargeaverage" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "DayOriginal" ADD COLUMN     "totalDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "totalDischargeaverage" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "DayReportCurrent" ADD COLUMN     "netEnergyImport" DECIMAL,
ADD COLUMN     "powerGeneration" DECIMAL;

-- AlterTable
ALTER TABLE "DayReportHistory" ADD COLUMN     "netEnergyImport" DECIMAL,
ADD COLUMN     "powerGeneration" DECIMAL;

-- AlterTable
ALTER TABLE "DayReviseDetail" ADD COLUMN     "totalDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "totalDischargeaverage" DECIMAL NOT NULL;
