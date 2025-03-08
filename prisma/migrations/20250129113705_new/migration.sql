-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'AGENT', 'CUSTOMER', 'SUPPORT', 'FINANCE', 'MANAGER', 'DEVELOPER') NOT NULL DEFAULT 'CUSTOMER',
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flightNumber` VARCHAR(191) NOT NULL,
    `airline` VARCHAR(191) NOT NULL,
    `departure` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,
    `arrivalTime` DATETIME(3) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Flight_flightNumber_key`(`flightNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `flightId` INTEGER NOT NULL,
    `paymentId` INTEGER NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Booking_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passenger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `passportNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `method` ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER') NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `basic` (
    `basic_id` INTEGER NOT NULL AUTO_INCREMENT,
    `basic_company` VARCHAR(191) NULL,
    `basic_title` VARCHAR(191) NULL,
    `basic_logo` VARCHAR(191) NULL,
    `basic_favicon` VARCHAR(191) NULL,
    `basic_flogo` VARCHAR(191) NULL,
    `basic_editor` INTEGER NULL,
    `basic_slug` VARCHAR(191) NULL,
    `basic_status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `basic_basic_id_key`(`basic_id`),
    PRIMARY KEY (`basic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_info` (
    `contact_info_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contact_info_phone1` VARCHAR(191) NULL,
    `contact_info_phone2` VARCHAR(191) NULL,
    `contact_info_phone3` VARCHAR(191) NULL,
    `contact_info_phone4` VARCHAR(191) NULL,
    `contact_info_email1` VARCHAR(191) NULL,
    `contact_info_email2` VARCHAR(191) NULL,
    `contact_info_email3` VARCHAR(191) NULL,
    `contact_info_email4` VARCHAR(191) NULL,
    `contact_info_website1` VARCHAR(191) NULL,
    `contact_info_website2` VARCHAR(191) NULL,
    `contact_info_add1` VARCHAR(191) NULL,
    `contact_info_add2` VARCHAR(191) NULL,
    `contact_info_add3` VARCHAR(191) NULL,
    `contact_info_add4` VARCHAR(191) NULL,
    `contact_info_editor` BOOLEAN NOT NULL DEFAULT false,
    `contact_info_slug` VARCHAR(191) NULL,
    `contact_info_status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `contact_info_contact_info_id_key`(`contact_info_id`),
    PRIMARY KEY (`contact_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_media` (
    `social_media_id` INTEGER NOT NULL AUTO_INCREMENT,
    `social_media_facebook` VARCHAR(191) NULL,
    `social_media_twitter` VARCHAR(191) NULL,
    `social_media_linkedin` VARCHAR(191) NULL,
    `social_media_instagram` VARCHAR(191) NULL,
    `social_media_youtube` VARCHAR(191) NULL,
    `social_media_pinterest` VARCHAR(191) NULL,
    `social_media_flickr` VARCHAR(191) NULL,
    `social_media_vimeo` VARCHAR(191) NULL,
    `social_media_skype` VARCHAR(191) NULL,
    `social_media_rss` VARCHAR(191) NULL,
    `social_media_editor` VARCHAR(191) NULL,
    `social_media_slug` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `social_media_social_media_id_key`(`social_media_id`),
    PRIMARY KEY (`social_media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `Flight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passenger` ADD CONSTRAINT `Passenger_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
