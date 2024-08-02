/*
  Warnings:

  - You are about to drop the `user_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_category` DROP FOREIGN KEY `user_category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_category` DROP FOREIGN KEY `user_category_user_id_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user_category`;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
