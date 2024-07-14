/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpires` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `account` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdAt` on the `account` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `account` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropIndex
DROP INDEX `Account_providerId_providerAccountId_key` ON `account`;

-- AlterTable
ALTER TABLE `account` DROP PRIMARY KEY,
    DROP COLUMN `accessToken`,
    DROP COLUMN `accessTokenExpires`,
    DROP COLUMN `providerId`,
    DROP COLUMN `providerType`,
    DROP COLUMN `refreshToken`,
    ADD COLUMN `access_token` TEXT NULL,
    ADD COLUMN `expires_at` INTEGER NULL,
    ADD COLUMN `id_token` TEXT NULL,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL,
    ADD COLUMN `refresh_token` TEXT NULL,
    ADD COLUMN `scope` VARCHAR(191) NULL,
    ADD COLUMN `session_state` VARCHAR(191) NULL,
    ADD COLUMN `token_type` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Account_userId_key` ON `Account`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account`(`provider`, `providerAccountId`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
