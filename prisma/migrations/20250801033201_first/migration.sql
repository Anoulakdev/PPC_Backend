-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "phone" TEXT,
    "isActive" TEXT DEFAULT 'A',
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "userimg" TEXT,
    "companyId" INTEGER,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "phone" VARCHAR(255),
    "isActive" TEXT DEFAULT 'A',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Voltage" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),

    CONSTRAINT "Voltage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FuelType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),

    CONSTRAINT "FuelType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contract" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Branch" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "province" VARCHAR(255),

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Owner" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Power" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "unit" INTEGER NOT NULL,
    "abbreviation" VARCHAR(255),
    "isActive" TEXT DEFAULT 'A',
    "address" VARCHAR(255),
    "phone" VARCHAR(255),
    "voltageId" INTEGER,
    "fuelId" INTEGER,
    "contractId" INTEGER,
    "branchId" INTEGER,
    "regionId" INTEGER,
    "ownerId" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "installCapacity" DECIMAL(10,2),
    "baseEnergy" DECIMAL(10,2),
    "codDate" TIMESTAMPTZ(0),
    "powerimg" VARCHAR(255),

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPower" (
    "userId" INTEGER NOT NULL,
    "powerId" INTEGER NOT NULL,

    CONSTRAINT "UserPower_pkey" PRIMARY KEY ("userId","powerId")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayPower" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "powerNo" VARCHAR(50) NOT NULL,
    "powerDate" TIMESTAMPTZ(0) NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "decAcknowUserId" INTEGER,
    "decAcknow" BOOLEAN NOT NULL DEFAULT false,
    "disAcknowUserId" INTEGER,
    "disAcknow" BOOLEAN NOT NULL DEFAULT false,
    "upstreamLevel" DECIMAL(10,2) NOT NULL,
    "downstreamLevel" DECIMAL(10,2) NOT NULL,
    "totalStorageamount" DECIMAL(10,2) NOT NULL,
    "totalStorageaverage" DECIMAL(10,2) NOT NULL,
    "activeStorageamount" DECIMAL(10,2) NOT NULL,
    "activeStorageaverage" DECIMAL(10,2) NOT NULL,
    "turbineDischargeamount" DECIMAL(10,2) NOT NULL,
    "turbineDischargeaverage" DECIMAL(10,2) NOT NULL,
    "spillwayDischargeamount" DECIMAL(10,2) NOT NULL,
    "spillwayDischargeaverage" DECIMAL(10,2) NOT NULL,
    "ecologicalDischargeamount" DECIMAL(10,2) NOT NULL,
    "ecologicalDischargeaverage" DECIMAL(10,2) NOT NULL,
    "machinesAvailability" JSONB NOT NULL,
    "revise" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "DayPower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayOriginal" (
    "id" SERIAL NOT NULL,
    "dayPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "DayOriginal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayCurrent" (
    "id" SERIAL NOT NULL,
    "dayPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "currentTurbines" JSONB NOT NULL,

    CONSTRAINT "DayCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayRevise" (
    "id" SERIAL NOT NULL,
    "dayPowerId" INTEGER NOT NULL,
    "reviseUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "DayRevise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayReviseDetail" (
    "id" SERIAL NOT NULL,
    "dayreviseId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "reviseTurbines" JSONB NOT NULL,

    CONSTRAINT "DayReviseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayReport" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "powerDate" TIMESTAMPTZ(0) NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "activeStorageamount" DECIMAL(10,2) NOT NULL,
    "activeStorageaverage" DECIMAL(10,2) NOT NULL,
    "waterLevel" DECIMAL(10,2) NOT NULL,
    "dwy" DECIMAL(10,2) NOT NULL,
    "dwf" DECIMAL(10,2) NOT NULL,
    "dwm" DECIMAL(10,2) NOT NULL,
    "pws" DECIMAL(10,2) NOT NULL,
    "inflowamount" DECIMAL(10,2) NOT NULL,
    "inflowaverage" DECIMAL(10,2) NOT NULL,
    "outflowamount" DECIMAL(10,2) NOT NULL,
    "outflowaverage" DECIMAL(10,2) NOT NULL,
    "spillwayamount" DECIMAL(10,2) NOT NULL,
    "spillwayaverage" DECIMAL(10,2) NOT NULL,
    "owramount" DECIMAL(10,2) NOT NULL,
    "owraverage" DECIMAL(10,2) NOT NULL,
    "rainFall" DECIMAL(10,2) NOT NULL,
    "netEnergyOutput" DECIMAL(10,2) NOT NULL,
    "waterRate" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "DayReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReportOriginal" (
    "id" SERIAL NOT NULL,
    "dayReportId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalUnit" INTEGER NOT NULL,
    "remarks" JSONB NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "ReportOriginal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeekPower" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "powerNo" VARCHAR(50) NOT NULL,
    "sYear" VARCHAR(50) NOT NULL,
    "sWeek" VARCHAR(50) NOT NULL,
    "startDate" TIMESTAMPTZ(0),
    "endDate" TIMESTAMPTZ(0),
    "createdByUserId" INTEGER NOT NULL,
    "decAcknowUserId" INTEGER,
    "decAcknow" BOOLEAN NOT NULL DEFAULT false,
    "disAcknowUserId" INTEGER,
    "disAcknow" BOOLEAN NOT NULL DEFAULT false,
    "revise" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "WeekPower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeekOriginal" (
    "id" SERIAL NOT NULL,
    "weekPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "WeekOriginal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeekCurrent" (
    "id" SERIAL NOT NULL,
    "weekPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "currentTurbines" JSONB NOT NULL,

    CONSTRAINT "WeekCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeekRevise" (
    "id" SERIAL NOT NULL,
    "weekPowerId" INTEGER NOT NULL,
    "reviseUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "WeekRevise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeekReviseDetail" (
    "id" SERIAL NOT NULL,
    "weekreviseId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "reviseTurbines" JSONB NOT NULL,

    CONSTRAINT "WeekReviseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthPower" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "powerNo" VARCHAR(50) NOT NULL,
    "yearmonth" VARCHAR(50) NOT NULL,
    "sYear" VARCHAR(50) NOT NULL,
    "sMonth" VARCHAR(50) NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "decAcknowUserId" INTEGER,
    "decAcknow" BOOLEAN NOT NULL DEFAULT false,
    "disAcknowUserId" INTEGER,
    "disAcknow" BOOLEAN NOT NULL DEFAULT false,
    "revise" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "MonthPower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthOriginal" (
    "id" SERIAL NOT NULL,
    "monthPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "MonthOriginal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthCurrent" (
    "id" SERIAL NOT NULL,
    "monthPowerId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "currentTurbines" JSONB NOT NULL,

    CONSTRAINT "MonthCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthRevise" (
    "id" SERIAL NOT NULL,
    "monthPowerId" INTEGER NOT NULL,
    "reviseUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "MonthRevise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthReviseDetail" (
    "id" SERIAL NOT NULL,
    "monthreviseId" INTEGER NOT NULL,
    "totalPower" DECIMAL(10,2) NOT NULL,
    "totalDate" INTEGER NOT NULL,
    "remark" TEXT,
    "remarks" JSONB NOT NULL,
    "reviseTurbines" JSONB NOT NULL,

    CONSTRAINT "MonthReviseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "DayPower_powerId_powerDate_idx" ON "public"."DayPower"("powerId", "powerDate");

-- CreateIndex
CREATE UNIQUE INDEX "DayOriginal_dayPowerId_key" ON "public"."DayOriginal"("dayPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "DayCurrent_dayPowerId_key" ON "public"."DayCurrent"("dayPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "DayReviseDetail_dayreviseId_key" ON "public"."DayReviseDetail"("dayreviseId");

-- CreateIndex
CREATE INDEX "DayReport_powerId_powerDate_idx" ON "public"."DayReport"("powerId", "powerDate");

-- CreateIndex
CREATE UNIQUE INDEX "ReportOriginal_dayReportId_key" ON "public"."ReportOriginal"("dayReportId");

-- CreateIndex
CREATE INDEX "WeekPower_powerId_sYear_sWeek_idx" ON "public"."WeekPower"("powerId", "sYear", "sWeek");

-- CreateIndex
CREATE UNIQUE INDEX "WeekOriginal_weekPowerId_key" ON "public"."WeekOriginal"("weekPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "WeekCurrent_weekPowerId_key" ON "public"."WeekCurrent"("weekPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "WeekReviseDetail_weekreviseId_key" ON "public"."WeekReviseDetail"("weekreviseId");

-- CreateIndex
CREATE INDEX "MonthPower_powerId_sYear_sMonth_idx" ON "public"."MonthPower"("powerId", "sYear", "sMonth");

-- CreateIndex
CREATE UNIQUE INDEX "MonthOriginal_monthPowerId_key" ON "public"."MonthOriginal"("monthPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthCurrent_monthPowerId_key" ON "public"."MonthCurrent"("monthPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthReviseDetail_monthreviseId_key" ON "public"."MonthReviseDetail"("monthreviseId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_voltageId_fkey" FOREIGN KEY ("voltageId") REFERENCES "public"."Voltage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_fuelId_fkey" FOREIGN KEY ("fuelId") REFERENCES "public"."FuelType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Power" ADD CONSTRAINT "Power_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPower" ADD CONSTRAINT "UserPower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPower" ADD CONSTRAINT "UserPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "public"."Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayPower" ADD CONSTRAINT "DayPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "public"."Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayPower" ADD CONSTRAINT "DayPower_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayPower" ADD CONSTRAINT "DayPower_decAcknowUserId_fkey" FOREIGN KEY ("decAcknowUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayPower" ADD CONSTRAINT "DayPower_disAcknowUserId_fkey" FOREIGN KEY ("disAcknowUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayOriginal" ADD CONSTRAINT "DayOriginal_dayPowerId_fkey" FOREIGN KEY ("dayPowerId") REFERENCES "public"."DayPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayCurrent" ADD CONSTRAINT "DayCurrent_dayPowerId_fkey" FOREIGN KEY ("dayPowerId") REFERENCES "public"."DayPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayRevise" ADD CONSTRAINT "DayRevise_dayPowerId_fkey" FOREIGN KEY ("dayPowerId") REFERENCES "public"."DayPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayRevise" ADD CONSTRAINT "DayRevise_reviseUserId_fkey" FOREIGN KEY ("reviseUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayReviseDetail" ADD CONSTRAINT "DayReviseDetail_dayreviseId_fkey" FOREIGN KEY ("dayreviseId") REFERENCES "public"."DayRevise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayReport" ADD CONSTRAINT "DayReport_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "public"."Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayReport" ADD CONSTRAINT "DayReport_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReportOriginal" ADD CONSTRAINT "ReportOriginal_dayReportId_fkey" FOREIGN KEY ("dayReportId") REFERENCES "public"."DayReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekPower" ADD CONSTRAINT "WeekPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "public"."Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekPower" ADD CONSTRAINT "WeekPower_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekPower" ADD CONSTRAINT "WeekPower_decAcknowUserId_fkey" FOREIGN KEY ("decAcknowUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekPower" ADD CONSTRAINT "WeekPower_disAcknowUserId_fkey" FOREIGN KEY ("disAcknowUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekOriginal" ADD CONSTRAINT "WeekOriginal_weekPowerId_fkey" FOREIGN KEY ("weekPowerId") REFERENCES "public"."WeekPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekCurrent" ADD CONSTRAINT "WeekCurrent_weekPowerId_fkey" FOREIGN KEY ("weekPowerId") REFERENCES "public"."WeekPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekRevise" ADD CONSTRAINT "WeekRevise_weekPowerId_fkey" FOREIGN KEY ("weekPowerId") REFERENCES "public"."WeekPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekRevise" ADD CONSTRAINT "WeekRevise_reviseUserId_fkey" FOREIGN KEY ("reviseUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeekReviseDetail" ADD CONSTRAINT "WeekReviseDetail_weekreviseId_fkey" FOREIGN KEY ("weekreviseId") REFERENCES "public"."WeekRevise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthPower" ADD CONSTRAINT "MonthPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "public"."Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthPower" ADD CONSTRAINT "MonthPower_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthPower" ADD CONSTRAINT "MonthPower_decAcknowUserId_fkey" FOREIGN KEY ("decAcknowUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthPower" ADD CONSTRAINT "MonthPower_disAcknowUserId_fkey" FOREIGN KEY ("disAcknowUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthOriginal" ADD CONSTRAINT "MonthOriginal_monthPowerId_fkey" FOREIGN KEY ("monthPowerId") REFERENCES "public"."MonthPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthCurrent" ADD CONSTRAINT "MonthCurrent_monthPowerId_fkey" FOREIGN KEY ("monthPowerId") REFERENCES "public"."MonthPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthRevise" ADD CONSTRAINT "MonthRevise_monthPowerId_fkey" FOREIGN KEY ("monthPowerId") REFERENCES "public"."MonthPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthRevise" ADD CONSTRAINT "MonthRevise_reviseUserId_fkey" FOREIGN KEY ("reviseUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthReviseDetail" ADD CONSTRAINT "MonthReviseDetail_monthreviseId_fkey" FOREIGN KEY ("monthreviseId") REFERENCES "public"."MonthRevise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
