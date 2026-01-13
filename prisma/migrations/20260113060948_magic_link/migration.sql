-- AlterTable
ALTER TABLE `User` ADD COLUMN `magicExpiresAt` DATETIME(3) NULL,
    ADD COLUMN `magicToken` VARCHAR(191) NULL;
