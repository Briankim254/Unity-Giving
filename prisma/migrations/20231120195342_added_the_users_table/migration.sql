/*
  Warnings:

  - The primary key for the `Beneficiary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Beneficiary` table. All the data in the column will be lost.
  - The primary key for the `CampaignBeneficiary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Donor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Donor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Beneficiary` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CampaignBeneficiary` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Donor` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(255) NULL,
    `email` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
