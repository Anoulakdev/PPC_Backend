/*
  Warnings:

  - You are about to drop the column `activeStorageamount` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `activeStorageaverage` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `averageOutflow` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUserId` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `dwf` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `dwm` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `dwy` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `inflowamount` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `inflowaverage` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `netEnergyOutput` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `owramount` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `owraverage` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `pws` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `rainFall` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `spillwayamount` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `spillwayaverage` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `tdAmount` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `tdAverage` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `totalOutflow` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `waterLevel` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the column `waterRate` on the `DayReport` table. All the data in the column will be lost.
  - You are about to drop the `ReportOriginal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DayReport" DROP CONSTRAINT "DayReport_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReportOriginal" DROP CONSTRAINT "ReportOriginal_dayReportId_fkey";

-- AlterTable
ALTER TABLE "public"."DayReport" DROP COLUMN "activeStorageamount",
DROP COLUMN "activeStorageaverage",
DROP COLUMN "averageOutflow",
DROP COLUMN "createdAt",
DROP COLUMN "createdByUserId",
DROP COLUMN "dwf",
DROP COLUMN "dwm",
DROP COLUMN "dwy",
DROP COLUMN "inflowamount",
DROP COLUMN "inflowaverage",
DROP COLUMN "netEnergyOutput",
DROP COLUMN "owramount",
DROP COLUMN "owraverage",
DROP COLUMN "pws",
DROP COLUMN "rainFall",
DROP COLUMN "spillwayamount",
DROP COLUMN "spillwayaverage",
DROP COLUMN "tdAmount",
DROP COLUMN "tdAverage",
DROP COLUMN "totalOutflow",
DROP COLUMN "updatedAt",
DROP COLUMN "waterLevel",
DROP COLUMN "waterRate";

-- DropTable
DROP TABLE "public"."ReportOriginal";

-- CreateTable
CREATE TABLE "public"."DayReportCurrent" (
    "id" SERIAL NOT NULL,
    "dayReportId" INTEGER NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "activeStorageamount" DECIMAL NOT NULL,
    "activeStorageaverage" DECIMAL NOT NULL,
    "waterLevel" DECIMAL NOT NULL,
    "dwy" DECIMAL NOT NULL,
    "dwf" DECIMAL NOT NULL,
    "dwm" DECIMAL NOT NULL,
    "pws" DECIMAL NOT NULL,
    "inflowamount" DECIMAL NOT NULL,
    "inflowaverage" DECIMAL NOT NULL,
    "tdAmount" DECIMAL NOT NULL,
    "tdAverage" DECIMAL NOT NULL,
    "spillwayamount" DECIMAL NOT NULL,
    "spillwayaverage" DECIMAL NOT NULL,
    "owramount" DECIMAL NOT NULL,
    "owraverage" DECIMAL NOT NULL,
    "rainFall" DECIMAL NOT NULL,
    "netEnergyOutput" DECIMAL NOT NULL,
    "waterRate" DECIMAL NOT NULL,
    "totalOutflow" DECIMAL NOT NULL,
    "averageOutflow" DECIMAL NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "DayReportCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReportCurrent" (
    "id" SERIAL NOT NULL,
    "dayReportCurrentId" INTEGER NOT NULL,
    "totalPower" DECIMAL NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remarks" JSONB NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "ReportCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayReportHistory" (
    "id" SERIAL NOT NULL,
    "dayReportId" INTEGER NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "activeStorageamount" DECIMAL NOT NULL,
    "activeStorageaverage" DECIMAL NOT NULL,
    "waterLevel" DECIMAL NOT NULL,
    "dwy" DECIMAL NOT NULL,
    "dwf" DECIMAL NOT NULL,
    "dwm" DECIMAL NOT NULL,
    "pws" DECIMAL NOT NULL,
    "inflowamount" DECIMAL NOT NULL,
    "inflowaverage" DECIMAL NOT NULL,
    "tdAmount" DECIMAL NOT NULL,
    "tdAverage" DECIMAL NOT NULL,
    "spillwayamount" DECIMAL NOT NULL,
    "spillwayaverage" DECIMAL NOT NULL,
    "owramount" DECIMAL NOT NULL,
    "owraverage" DECIMAL NOT NULL,
    "rainFall" DECIMAL NOT NULL,
    "netEnergyOutput" DECIMAL NOT NULL,
    "waterRate" DECIMAL NOT NULL,
    "totalOutflow" DECIMAL NOT NULL,
    "averageOutflow" DECIMAL NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "DayReportHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReportHistory" (
    "id" SERIAL NOT NULL,
    "dayReportHistoryId" INTEGER NOT NULL,
    "totalPower" DECIMAL NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remarks" JSONB NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "ReportHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DayReportCurrent_dayReportId_key" ON "public"."DayReportCurrent"("dayReportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportCurrent_dayReportCurrentId_key" ON "public"."ReportCurrent"("dayReportCurrentId");

-- CreateIndex
CREATE UNIQUE INDEX "DayReportHistory_dayReportId_key" ON "public"."DayReportHistory"("dayReportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportHistory_dayReportHistoryId_key" ON "public"."ReportHistory"("dayReportHistoryId");

-- AddForeignKey
ALTER TABLE "public"."DayReportCurrent" ADD CONSTRAINT "DayReportCurrent_dayReportId_fkey" FOREIGN KEY ("dayReportId") REFERENCES "public"."DayReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayReportCurrent" ADD CONSTRAINT "DayReportCurrent_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReportCurrent" ADD CONSTRAINT "ReportCurrent_dayReportCurrentId_fkey" FOREIGN KEY ("dayReportCurrentId") REFERENCES "public"."DayReportCurrent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayReportHistory" ADD CONSTRAINT "DayReportHistory_dayReportId_fkey" FOREIGN KEY ("dayReportId") REFERENCES "public"."DayReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayReportHistory" ADD CONSTRAINT "DayReportHistory_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReportHistory" ADD CONSTRAINT "ReportHistory_dayReportHistoryId_fkey" FOREIGN KEY ("dayReportHistoryId") REFERENCES "public"."DayReportHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
