-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'FARMER',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "kycStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "language" TEXT NOT NULL DEFAULT 'en',
    "linkedBank" TEXT,
    "linkedUPI" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "aadhaarNo" TEXT,
    "panNo" TEXT,
    "landDetails" TEXT,
    "farmAddress" TEXT,
    "farmSize" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verificationNotes" TEXT,
    "documents" TEXT,
    "polygonId" TEXT,
    "polygonData" TEXT,
    "satelliteStatus" TEXT,
    "latestAcquisitionDate" TEXT,
    "truecolorUrl" TEXT,
    "ndviUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalInvested" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReturns" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "produceName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "location" TEXT,
    "landSize" TEXT,
    "animalCount" INTEGER,
    "capitalRequired" DOUBLE PRECISION NOT NULL,
    "capitalRaised" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "inputBreakdown" TEXT,
    "profitSplitFarmer" DOUBLE PRECISION NOT NULL DEFAULT 60,
    "profitSplitInvestor" DOUBLE PRECISION NOT NULL DEFAULT 40,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "insuranceFlag" BOOLEAN NOT NULL DEFAULT true,
    "riskTier" TEXT NOT NULL DEFAULT 'MEDIUM',
    "cycleDuration" INTEGER NOT NULL,
    "expectedYield" TEXT,
    "expectedPrice" DOUBLE PRECISION,
    "expectedReturn" DOUBLE PRECISION,
    "ndviScore" DOUBLE PRECISION,
    "stockPrice" DOUBLE PRECISION,
    "vegetationStatus" TEXT,
    "milestones" TEXT,
    "harvestQuantity" TEXT,
    "harvestRevenue" DOUBLE PRECISION,
    "harvestProof" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "fundedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "sharePercent" DOUBLE PRECISION NOT NULL,
    "payoutStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "payoutAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressUpdate" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "mediaUrls" TEXT,
    "verifiedBy" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuidanceTip" (
    "id" TEXT NOT NULL,
    "listingId" TEXT,
    "applicableType" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',

    CONSTRAINT "GuidanceTip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InputOrder" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "supplierId" TEXT,
    "items" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "deliveryConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InputOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceClaim" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "evidence" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "payoutAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropCycleState" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL DEFAULT 1,
    "cropStage" TEXT NOT NULL DEFAULT 'VEGETATIVE',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "geofenceLat" DOUBLE PRECISION NOT NULL,
    "geofenceLng" DOUBLE PRECISION NOT NULL,
    "geofenceRadiusM" DOUBLE PRECISION NOT NULL DEFAULT 150,
    "capitalGrantedInr" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "capitalDisbursedInr" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentPriceInr" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceHistory" TEXT NOT NULL DEFAULT '[]',
    "healthIndexHistory" TEXT NOT NULL DEFAULT '[]',
    "openDiseaseFlags" TEXT NOT NULL DEFAULT '[]',
    "consecutiveMissedSubmissions" INTEGER NOT NULL DEFAULT 0,
    "trustScore" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "lastReportId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CropCycleState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionWindow" (
    "id" TEXT NOT NULL,
    "cycleStateId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "opensAt" TIMESTAMP(3) NOT NULL,
    "closesAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "notifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionWindow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SatelliteSnapshot" (
    "id" TEXT NOT NULL,
    "cycleStateId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "truecolorUrl" TEXT,
    "ndviUrl" TEXT,
    "ndviMean" DOUBLE PRECISION,
    "ndviDelta" DOUBLE PRECISION,
    "ndwiMean" DOUBLE PRECISION,
    "ndwiDelta" DOUBLE PRECISION,
    "acquisitionDate" TEXT,
    "cloudCoverPct" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SatelliteSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerSubmission" (
    "id" TEXT NOT NULL,
    "cycleStateId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "resubmitCount" INTEGER NOT NULL DEFAULT 0,
    "rejectionReason" TEXT,
    "rejectionReasonLocalized" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "FarmerSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionImage" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "captureLat" DOUBLE PRECISION NOT NULL,
    "captureLng" DOUBLE PRECISION NOT NULL,
    "captureAccuracyM" DOUBLE PRECISION NOT NULL,
    "serverTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "perceptualHash" TEXT,
    "subLocationIndex" INTEGER NOT NULL,

    CONSTRAINT "SubmissionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionBill" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "ocrConfidence" DOUBLE PRECISION,
    "extractedVendor" TEXT,
    "extractedDate" TEXT,
    "extractedAmount" DOUBLE PRECISION,
    "extractedItems" TEXT,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationResult" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "geofencePass" BOOLEAN NOT NULL,
    "livenessPass" BOOLEAN NOT NULL,
    "noveltyPass" BOOLEAN NOT NULL,
    "legibilityPass" BOOLEAN NOT NULL,
    "billSanityPass" BOOLEAN NOT NULL,
    "overallPass" BOOLEAN NOT NULL,
    "failureReason" TEXT,
    "failureReasonLocalized" TEXT,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropHealthAnalysis" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "healthIndex" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "growthStageEst" TEXT,
    "anomalyFlags" TEXT NOT NULL DEFAULT '[]',
    "modelVersion" TEXT NOT NULL,
    "kbVersion" TEXT NOT NULL,
    "analyzedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CropHealthAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthDetection" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "diseaseName" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "affectedPct" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HealthDetection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemediationCard" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "diseaseName" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "dosage" TEXT,
    "urgencyLevel" TEXT NOT NULL,
    "expectedYieldImpact" TEXT,
    "estimatedCostInr" DOUBLE PRECISION,
    "followUpFlag" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RemediationCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyCropReport" (
    "id" TEXT NOT NULL,
    "cycleStateId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "contentHash" TEXT NOT NULL,
    "reportData" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING_REVIEW',
    "reviewerId" TEXT,
    "reviewNotes" TEXT,
    "modelVersion" TEXT NOT NULL,
    "kbVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "WeeklyCropReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceChange" (
    "id" TEXT NOT NULL,
    "cycleStateId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "priorPriceInr" DOUBLE PRECISION NOT NULL,
    "newPriceInr" DOUBLE PRECISION NOT NULL,
    "deltaPercent" DOUBLE PRECISION NOT NULL,
    "clamped" BOOLEAN NOT NULL DEFAULT false,
    "circuitBreakerTriggered" BOOLEAN NOT NULL DEFAULT false,
    "publishAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceAttribution" (
    "id" TEXT NOT NULL,
    "priceChangeId" TEXT NOT NULL,
    "factor" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "rawValue" DOUBLE PRECISION NOT NULL,
    "basisPoints" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "PriceAttribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerAppeal" (
    "id" TEXT NOT NULL,
    "cycleStateId" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "appealType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "resolutionNotes" TEXT,
    "fieldAgentId" TEXT,
    "slaDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "FarmerAppeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FarmerProfile_userId_key" ON "FarmerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorProfile_userId_key" ON "InvestorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationResult_submissionId_key" ON "VerificationResult"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "CropHealthAnalysis_submissionId_key" ON "CropHealthAnalysis"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceChange_reportId_key" ON "PriceChange"("reportId");

-- AddForeignKey
ALTER TABLE "FarmerProfile" ADD CONSTRAINT "FarmerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorProfile" ADD CONSTRAINT "InvestorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressUpdate" ADD CONSTRAINT "ProgressUpdate_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressUpdate" ADD CONSTRAINT "ProgressUpdate_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuidanceTip" ADD CONSTRAINT "GuidanceTip_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputOrder" ADD CONSTRAINT "InputOrder_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaim" ADD CONSTRAINT "InsuranceClaim_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCycleState" ADD CONSTRAINT "CropCycleState_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCycleState" ADD CONSTRAINT "CropCycleState_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionWindow" ADD CONSTRAINT "SubmissionWindow_cycleStateId_fkey" FOREIGN KEY ("cycleStateId") REFERENCES "CropCycleState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatelliteSnapshot" ADD CONSTRAINT "SatelliteSnapshot_cycleStateId_fkey" FOREIGN KEY ("cycleStateId") REFERENCES "CropCycleState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerSubmission" ADD CONSTRAINT "FarmerSubmission_cycleStateId_fkey" FOREIGN KEY ("cycleStateId") REFERENCES "CropCycleState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionImage" ADD CONSTRAINT "SubmissionImage_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FarmerSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionBill" ADD CONSTRAINT "SubmissionBill_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FarmerSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationResult" ADD CONSTRAINT "VerificationResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FarmerSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropHealthAnalysis" ADD CONSTRAINT "CropHealthAnalysis_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FarmerSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthDetection" ADD CONSTRAINT "HealthDetection_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "CropHealthAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemediationCard" ADD CONSTRAINT "RemediationCard_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "CropHealthAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyCropReport" ADD CONSTRAINT "WeeklyCropReport_cycleStateId_fkey" FOREIGN KEY ("cycleStateId") REFERENCES "CropCycleState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceChange" ADD CONSTRAINT "PriceChange_cycleStateId_fkey" FOREIGN KEY ("cycleStateId") REFERENCES "CropCycleState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceChange" ADD CONSTRAINT "PriceChange_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "WeeklyCropReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceAttribution" ADD CONSTRAINT "PriceAttribution_priceChangeId_fkey" FOREIGN KEY ("priceChangeId") REFERENCES "PriceChange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerAppeal" ADD CONSTRAINT "FarmerAppeal_cycleStateId_fkey" FOREIGN KEY ("cycleStateId") REFERENCES "CropCycleState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
