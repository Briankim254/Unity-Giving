-- DropIndex
DROP INDEX `Beneficiary_user_id_key` ON `Beneficiary`;

-- CreateIndex
CREATE INDEX `Beneficiary_user_id_idx` ON `Beneficiary`(`user_id`);
