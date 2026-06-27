-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'UNIQUE', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "CareActionType" AS ENUM ('FEED', 'WATER', 'PET', 'TOUCH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterCatalog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "probability" INTEGER NOT NULL,
    "modelUrl" TEXT,
    "thumbnailUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCharacter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "characterCatalogId" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT true,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "hunger" INTEGER NOT NULL DEFAULT 70,
    "hydration" INTEGER NOT NULL DEFAULT 70,
    "affection" INTEGER NOT NULL DEFAULT 50,
    "energy" INTEGER NOT NULL DEFAULT 80,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EggHatch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "characterCatalogId" TEXT NOT NULL,
    "eggType" TEXT NOT NULL,
    "probability" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EggHatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userCharacterId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "grantedExp" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiaryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareActionLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userCharacterId" TEXT NOT NULL,
    "actionType" "CareActionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CareActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserCharacter_userId_idx" ON "UserCharacter"("userId");

-- CreateIndex
CREATE INDEX "UserCharacter_characterCatalogId_idx" ON "UserCharacter"("characterCatalogId");

-- CreateIndex
CREATE INDEX "EggHatch_userId_idx" ON "EggHatch"("userId");

-- CreateIndex
CREATE INDEX "DiaryEntry_userId_createdAt_idx" ON "DiaryEntry"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "CareActionLog_userId_actionType_createdAt_idx" ON "CareActionLog"("userId", "actionType", "createdAt");

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_characterCatalogId_fkey" FOREIGN KEY ("characterCatalogId") REFERENCES "CharacterCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EggHatch" ADD CONSTRAINT "EggHatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EggHatch" ADD CONSTRAINT "EggHatch_characterCatalogId_fkey" FOREIGN KEY ("characterCatalogId") REFERENCES "CharacterCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryEntry" ADD CONSTRAINT "DiaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryEntry" ADD CONSTRAINT "DiaryEntry_userCharacterId_fkey" FOREIGN KEY ("userCharacterId") REFERENCES "UserCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareActionLog" ADD CONSTRAINT "CareActionLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareActionLog" ADD CONSTRAINT "CareActionLog_userCharacterId_fkey" FOREIGN KEY ("userCharacterId") REFERENCES "UserCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
