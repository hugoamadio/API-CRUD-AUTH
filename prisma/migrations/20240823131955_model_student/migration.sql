-- CreateTable
CREATE TABLE "student" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "surname" VARCHAR(150) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_cpf_key" ON "student"("cpf");
