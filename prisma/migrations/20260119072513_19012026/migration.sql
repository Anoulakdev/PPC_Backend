-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "bossAknow" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "YearPower" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "powerNo" VARCHAR(50) NOT NULL,
    "sYear" VARCHAR(50) NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "decAcknowUserId" INTEGER,
    "decAcknow" BOOLEAN NOT NULL DEFAULT false,
    "decAcknowAt" TIMESTAMPTZ(0),
    "disAcknowUserId" INTEGER,
    "disAcknow" BOOLEAN NOT NULL DEFAULT false,
    "disAcknowAt" TIMESTAMPTZ(0),
    "revise" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "YearPower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearStart" (
    "id" SERIAL NOT NULL,
    "yearPowerId" INTEGER NOT NULL,
    "startTurbines" JSONB NOT NULL,

    CONSTRAINT "YearStart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearOriginal" (
    "id" SERIAL NOT NULL,
    "yearPowerId" INTEGER NOT NULL,
    "originalTurbines" JSONB NOT NULL,

    CONSTRAINT "YearOriginal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearCurrent" (
    "id" SERIAL NOT NULL,
    "yearPowerId" INTEGER NOT NULL,
    "currentTurbines" JSONB NOT NULL,

    CONSTRAINT "YearCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearRevise" (
    "id" SERIAL NOT NULL,
    "yearPowerId" INTEGER NOT NULL,
    "reviseUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "YearRevise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearReviseDetail" (
    "id" SERIAL NOT NULL,
    "yearreviseId" INTEGER NOT NULL,
    "reviseTurbines" JSONB NOT NULL,

    CONSTRAINT "YearReviseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YearPower_powerId_sYear_idx" ON "YearPower"("powerId", "sYear");

-- CreateIndex
CREATE UNIQUE INDEX "YearStart_yearPowerId_key" ON "YearStart"("yearPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "YearOriginal_yearPowerId_key" ON "YearOriginal"("yearPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "YearCurrent_yearPowerId_key" ON "YearCurrent"("yearPowerId");

-- CreateIndex
CREATE UNIQUE INDEX "YearReviseDetail_yearreviseId_key" ON "YearReviseDetail"("yearreviseId");

-- AddForeignKey
ALTER TABLE "YearPower" ADD CONSTRAINT "YearPower_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearPower" ADD CONSTRAINT "YearPower_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearPower" ADD CONSTRAINT "YearPower_decAcknowUserId_fkey" FOREIGN KEY ("decAcknowUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearPower" ADD CONSTRAINT "YearPower_disAcknowUserId_fkey" FOREIGN KEY ("disAcknowUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearStart" ADD CONSTRAINT "YearStart_yearPowerId_fkey" FOREIGN KEY ("yearPowerId") REFERENCES "YearPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearOriginal" ADD CONSTRAINT "YearOriginal_yearPowerId_fkey" FOREIGN KEY ("yearPowerId") REFERENCES "YearPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearCurrent" ADD CONSTRAINT "YearCurrent_yearPowerId_fkey" FOREIGN KEY ("yearPowerId") REFERENCES "YearPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearRevise" ADD CONSTRAINT "YearRevise_yearPowerId_fkey" FOREIGN KEY ("yearPowerId") REFERENCES "YearPower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearRevise" ADD CONSTRAINT "YearRevise_reviseUserId_fkey" FOREIGN KEY ("reviseUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearReviseDetail" ADD CONSTRAINT "YearReviseDetail_yearreviseId_fkey" FOREIGN KEY ("yearreviseId") REFERENCES "YearRevise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
