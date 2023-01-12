-- CreateTable
CREATE TABLE `Image` (
    `idImage` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Image_idImage_key`(`idImage`),
    UNIQUE INDEX `Image_fileName_key`(`fileName`),
    PRIMARY KEY (`idImage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
