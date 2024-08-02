/*
  Warnings:

  - You are about to drop the column `userId` on the `categories` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_userId_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
