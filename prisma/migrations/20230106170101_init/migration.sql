-- CreateTable
CREATE TABLE `User` (
    `idUser` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_idUser_key`(`idUser`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jurusan` (
    `idJurusan` VARCHAR(191) NOT NULL,
    `kodeJurusan` VARCHAR(191) NOT NULL,
    `namaJurusan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Jurusan_idJurusan_key`(`idJurusan`),
    UNIQUE INDEX `Jurusan_kodeJurusan_key`(`kodeJurusan`),
    PRIMARY KEY (`idJurusan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `idGuru` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guru_idGuru_key`(`idGuru`),
    PRIMARY KEY (`idGuru`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siswa` (
    `idSiswa` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jurusanIdJurusan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Siswa_nisn_key`(`nisn`),
    PRIMARY KEY (`idSiswa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Berita` (
    `idBerita` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `artikel` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userIdUser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idBerita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_jurusanIdJurusan_fkey` FOREIGN KEY (`jurusanIdJurusan`) REFERENCES `Jurusan`(`idJurusan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_userIdUser_fkey` FOREIGN KEY (`userIdUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
