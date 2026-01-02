-- AlterTable
ALTER TABLE "DayPower" ADD COLUMN     "decACknowAt" TIMESTAMPTZ(0),
ADD COLUMN     "disAcknowAt" TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "MonthPower" ADD COLUMN     "decACknowAt" TIMESTAMPTZ(0),
ADD COLUMN     "disAcknowAt" TIMESTAMPTZ(0);

-- AlterTable
ALTER TABLE "WeekPower" ADD COLUMN     "decACknowAt" TIMESTAMPTZ(0),
ADD COLUMN     "disAcknowAt" TIMESTAMPTZ(0);

-- CreateTable
CREATE TABLE "DayStart" (
    "id" SERIAL NOT NULL,
    "dayPowerId" INTEGER NOT NULL,
    "upstreamLevel" DECIMAL NOT NULL,
    "downstreamLevel" DECIMAL NOT NULL,
    "totalStorageamount" DECIMAL NOT NULL,
    "totalStorageaverage" DECIMAL NOT NULL,
    "activeStorageamount" DECIMAL NOT NULL,
    "activeStorageaverage" DECIMAL NOT NULL,
    "turbineDischargeamount" DECIMAL NOT NULL,
    "turbineDischargeaverage" DECIMAL NOT NULL,
    "spillwayDischargeamount" DECIMAL NOT NULL,
    "spillwayDischargeaverage" DECIMAL NOT NULL,
    "ecologicalDischargeamount" DECIMAL NOT NULL,
    "ecologicalDischargeaverage" DECIMAL NOT NULL,
    "totalDischargeamount" DECIMAL NOT NULL,
    "totalDischargeaverage" DECIMAL NOT NULL,
    "machinesAvailability" JSONB NOT NULL,
    "totalPower" DECIMAL NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "startTurbines" JSONB NOT NULL,

    CONSTRAINT "DayStart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekStart" (
    "id" SERIAL NOT NULL,
    "weekPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "startTurbines" JSONB NOT NULL,

    CONSTRAINT "WeekStart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthStart" (
    "id" SERIAL NOT NULL,
    "monthPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "startTurbines" JSONB NOT NULL,

    CONSTRAINT "MonthStart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DayStart_dayPowerId_key" ON "DayStart"("dayPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "WeekStart_weekPowerId_key" ON "WeekStart"("weekPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthStart_monthPowerId_key" ON "MonthStart"("monthPowerId");

-- AddForeignKey
ALTER TABLE "DayStart" ADD CONSTRAINT "DayStart_dayPowerId_fkey" FOREIGN KEY ("dayPowerId") REFERENCES "DayPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekStart" ADD CONSTRAINT "WeekStart_weekPowerId_fkey" FOREIGN KEY ("weekPowerId") REFERENCES "WeekPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthStart" ADD CONSTRAINT "MonthStart_monthPowerId_fkey" FOREIGN KEY ("monthPowerId") REFERENCES "MonthPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
