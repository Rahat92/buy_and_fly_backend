/*
  Warnings:

  - Added the required column `phoneNo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `phoneNo` VARCHAR(191) NOT NULL;
