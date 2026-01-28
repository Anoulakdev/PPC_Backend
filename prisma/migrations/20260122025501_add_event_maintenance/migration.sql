-- CreateTable
CREATE TABLE "EventReport" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ(0) NOT NULL,
    "endDate" TIMESTAMPTZ(0) NOT NULL,
    "startTime" VARCHAR(50) NOT NULL,
    "endTime" VARCHAR(50) NOT NULL,
    "rootCause" TEXT,
    "preventive" TEXT,
    "remark" TEXT,
    "eventFile" VARCHAR(255),
    "partAdd" INTEGER,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "EventReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenancePlan" (
    "id" SERIAL NOT NULL,
    "powerId" INTEGER NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "maintenanceName" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ(0) NOT NULL,
    "endDate" TIMESTAMPTZ(0) NOT NULL,
    "startTime" VARCHAR(50) NOT NULL,
    "endTime" VARCHAR(50) NOT NULL,
    "detail" TEXT,
    "remark" TEXT,
    "maintenanceFile" VARCHAR(255),
    "partAdd" INTEGER,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "MaintenancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventReport_powerId_idx" ON "EventReport"("powerId");

-- CreateIndex
CREATE INDEX "MaintenancePlan_powerId_idx" ON "MaintenancePlan"("powerId");

-- AddForeignKey
ALTER TABLE "EventReport" ADD CONSTRAINT "EventReport_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventReport" ADD CONSTRAINT "EventReport_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenancePlan" ADD CONSTRAINT "MaintenancePlan_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenancePlan" ADD CONSTRAINT "MaintenancePlan_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
