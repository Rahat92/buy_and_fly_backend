-- DropForeignKey
ALTER TABLE `user_permissions` DROP FOREIGN KEY `user_permissions_user_id_fkey`;

-- DropIndex
DROP INDEX `user_permissions_user_id_fkey` ON `user_permissions`;

-- AlterTable
ALTER TABLE `user_permissions` ADD COLUMN `role_id` INTEGER NULL,
    MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `user_role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
