/*
  Warnings:

  - You are about to alter the column `userIdUser` on the `Berita` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `idUser` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Berita` DROP FOREIGN KEY `Berita_userIdUser_fkey`;

-- DropIndex
DROP INDEX `Guru_idGuru_key` ON `Guru`;

-- DropIndex
DROP INDEX `Jurusan_idJurusan_key` ON `Jurusan`;

-- DropIndex
DROP INDEX `User_idUser_key` ON `User`;

-- AlterTable
ALTER TABLE `Berita` MODIFY `userIdUser` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idUser`);

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_userIdUser_fkey` FOREIGN KEY (`userIdUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
