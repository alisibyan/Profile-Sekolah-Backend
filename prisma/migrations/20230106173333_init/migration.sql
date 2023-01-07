/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Berita` DROP FOREIGN KEY `Berita_userIdUser_fkey`;

-- AlterTable
ALTER TABLE `Berita` MODIFY `userIdUser` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `idUser` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idUser`);

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_userIdUser_fkey` FOREIGN KEY (`userIdUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
