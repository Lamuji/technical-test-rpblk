-- CreateTable
CREATE TABLE "Profil" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);
