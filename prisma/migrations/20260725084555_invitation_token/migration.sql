/*
  Warnings:

  - You are about to alter the column `email` on the `TeamInvitation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[token]` on the table `TeamInvitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `TeamInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamInvitation" ADD COLUMN     "token" VARCHAR(255) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "TeamInvitation_token_key" ON "TeamInvitation"("token");
