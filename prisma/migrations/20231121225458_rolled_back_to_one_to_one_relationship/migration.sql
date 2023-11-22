/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Beneficiary_user_id_idx` ON `Beneficiary`;

-- CreateIndex
CREATE UNIQUE INDEX `Beneficiary_user_id_key` ON `Beneficiary`(`user_id`);
