/*
  Warnings:

  - You are about to drop the column `total` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `total`;

-- CreateTable
CREATE TABLE `user_category` (
    `user_id` VARCHAR(255) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    INDEX `user_categories_user_id_fkey`(`user_id`),
    INDEX `user_categories_category_id_fkey`(`category_id`),
    PRIMARY KEY (`user_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_category` ADD CONSTRAINT `user_category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_category` ADD CONSTRAINT `user_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
