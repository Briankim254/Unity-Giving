/*
  Warnings:

  - You are about to drop the `Beneficiary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Beneficiary`;

-- DropTable
DROP TABLE `campaign`;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'DELETED') NOT NULL DEFAULT 'DRAFT',
    `amount` INTEGER NOT NULL DEFAULT 0,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Campaign_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
