/*
  Warnings:

  - The primary key for the `Beneficiary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Beneficiary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `CampaignBeneficiary` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[beneficiary_id]` on the table `campaign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beneficiary_id` to the `campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Beneficiary` DROP PRIMARY KEY,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `phone` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `beneficiary_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `CampaignBeneficiary`;

-- CreateIndex
CREATE UNIQUE INDEX `Beneficiary_user_id_key` ON `Beneficiary`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `campaign_beneficiary_id_key` ON `campaign`(`beneficiary_id`);
