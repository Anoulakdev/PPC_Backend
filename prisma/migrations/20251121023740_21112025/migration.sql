/*
  Warnings:

  - You are about to drop the column `activeStorageamount` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `activeStorageaverage` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `downstreamLevel` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `ecologicalDischargeamount` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `ecologicalDischargeaverage` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `machinesAvailability` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `spillwayDischargeamount` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `spillwayDischargeaverage` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `totalStorageamount` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `totalStorageaverage` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `turbineDischargeamount` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `turbineDischargeaverage` on the `DayPower` table. All the data in the column will be lost.
  - You are about to drop the column `upstreamLevel` on the `DayPower` table. All the data in the column will be lost.
  - Added the required column `activeStorageamount` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeStorageaverage` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downstreamLevel` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecologicalDischargeamount` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecologicalDischargeaverage` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machinesAvailability` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spillwayDischargeamount` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spillwayDischargeaverage` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStorageamount` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStorageaverage` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turbineDischargeamount` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turbineDischargeaverage` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upstreamLevel` to the `DayCurrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeStorageamount` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeStorageaverage` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downstreamLevel` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecologicalDischargeamount` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecologicalDischargeaverage` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machinesAvailability` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spillwayDischargeamount` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spillwayDischargeaverage` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStorageamount` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStorageaverage` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turbineDischargeamount` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turbineDischargeaverage` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upstreamLevel` to the `DayOriginal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeStorageamount` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeStorageaverage` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downstreamLevel` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecologicalDischargeamount` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecologicalDischargeaverage` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machinesAvailability` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spillwayDischargeamount` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spillwayDischargeaverage` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStorageamount` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStorageaverage` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turbineDischargeamount` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turbineDischargeaverage` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upstreamLevel` to the `DayReviseDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DayCurrent" ADD COLUMN     "activeStorageamount" DECIMAL NOT NULL,
ADD COLUMN     "activeStorageaverage" DECIMAL NOT NULL,
ADD COLUMN     "downstreamLevel" DECIMAL NOT NULL,
ADD COLUMN     "ecologicalDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "ecologicalDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "machinesAvailability" JSONB NOT NULL,
ADD COLUMN     "spillwayDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "spillwayDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "totalStorageamount" DECIMAL NOT NULL,
ADD COLUMN     "totalStorageaverage" DECIMAL NOT NULL,
ADD COLUMN     "turbineDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "turbineDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "upstreamLevel" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "DayOriginal" ADD COLUMN     "activeStorageamount" DECIMAL NOT NULL,
ADD COLUMN     "activeStorageaverage" DECIMAL NOT NULL,
ADD COLUMN     "downstreamLevel" DECIMAL NOT NULL,
ADD COLUMN     "ecologicalDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "ecologicalDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "machinesAvailability" JSONB NOT NULL,
ADD COLUMN     "spillwayDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "spillwayDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "totalStorageamount" DECIMAL NOT NULL,
ADD COLUMN     "totalStorageaverage" DECIMAL NOT NULL,
ADD COLUMN     "turbineDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "turbineDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "upstreamLevel" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "DayPower" DROP COLUMN "activeStorageamount",
DROP COLUMN "activeStorageaverage",
DROP COLUMN "downstreamLevel",
DROP COLUMN "ecologicalDischargeamount",
DROP COLUMN "ecologicalDischargeaverage",
DROP COLUMN "machinesAvailability",
DROP COLUMN "spillwayDischargeamount",
DROP COLUMN "spillwayDischargeaverage",
DROP COLUMN "totalStorageamount",
DROP COLUMN "totalStorageaverage",
DROP COLUMN "turbineDischargeamount",
DROP COLUMN "turbineDischargeaverage",
DROP COLUMN "upstreamLevel";

-- AlterTable
ALTER TABLE "DayReviseDetail" ADD COLUMN     "activeStorageamount" DECIMAL NOT NULL,
ADD COLUMN     "activeStorageaverage" DECIMAL NOT NULL,
ADD COLUMN     "downstreamLevel" DECIMAL NOT NULL,
ADD COLUMN     "ecologicalDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "ecologicalDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "machinesAvailability" JSONB NOT NULL,
ADD COLUMN     "spillwayDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "spillwayDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "totalStorageamount" DECIMAL NOT NULL,
ADD COLUMN     "totalStorageaverage" DECIMAL NOT NULL,
ADD COLUMN     "turbineDischargeamount" DECIMAL NOT NULL,
ADD COLUMN     "turbineDischargeaverage" DECIMAL NOT NULL,
ADD COLUMN     "upstreamLevel" DECIMAL NOT NULL;
