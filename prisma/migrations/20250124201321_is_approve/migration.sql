-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "mail" TEXT DEFAULT '',
    "isVerifyMail" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT DEFAULT '',
    "quote" TEXT DEFAULT '',
    "avatar" TEXT DEFAULT '',
    "nickName" TEXT DEFAULT '',
    "isApprove" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "agent" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "refresh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinematics" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT DEFAULT '',
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "countSheet" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cinematics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinematic_members" (
    "id" SERIAL NOT NULL,
    "actorId" INTEGER NOT NULL,
    "cinematicId" INTEGER NOT NULL,
    "isPromiseCome" BOOLEAN NOT NULL DEFAULT false,
    "wasHours" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cinematic_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actors" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lvl" INTEGER NOT NULL DEFAULT 1,
    "points" INTEGER NOT NULL DEFAULT 0,
    "countWarn" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickName_key" ON "users"("nickName");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_id_key" ON "refresh"("id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_key" ON "refresh"("token");

-- CreateIndex
CREATE UNIQUE INDEX "cinematics_id_key" ON "cinematics"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cinematic_members_id_key" ON "cinematic_members"("id");

-- CreateIndex
CREATE UNIQUE INDEX "actors_id_key" ON "actors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "actors_userId_key" ON "actors"("userId");

-- AddForeignKey
ALTER TABLE "refresh" ADD CONSTRAINT "refresh_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinematic_members" ADD CONSTRAINT "cinematic_members_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinematic_members" ADD CONSTRAINT "cinematic_members_cinematicId_fkey" FOREIGN KEY ("cinematicId") REFERENCES "cinematics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actors" ADD CONSTRAINT "actors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
