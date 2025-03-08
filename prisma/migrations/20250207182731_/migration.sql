/*
  Warnings:

  - You are about to drop the column `role_id` on the `user_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_permissions` DROP FOREIGN KEY `user_permissions_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_permissions` DROP FOREIGN KEY `user_permissions_user_id_fkey`;

-- DropIndex
DROP INDEX `user_permissions_role_id_fkey` ON `user_permissions`;

-- DropIndex
DROP INDEX `user_permissions_user_id_fkey` ON `user_permissions`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `permissions` JSON NOT NULL;

-- AlterTable
ALTER TABLE `user_permissions` DROP COLUMN `role_id`,
    DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `user_role` ADD COLUMN `permissions` JSON NOT NULL;
