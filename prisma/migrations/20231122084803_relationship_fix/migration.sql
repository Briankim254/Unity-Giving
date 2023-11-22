-- DropIndex
DROP INDEX `Campaign_user_id_key` ON `Campaign`;

-- CreateIndex
CREATE INDEX `Campaign_user_id_idx` ON `Campaign`(`user_id`);
