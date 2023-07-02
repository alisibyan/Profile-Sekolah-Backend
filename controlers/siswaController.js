const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon = require("argon2");

const getAllSiswa = (req, res, next) => {
  const { nama } = req.query;

  prisma.siswa
    .findMany({
      select: {
        id: true,
        nama: true,
        nisn: true,
        kelas: { select: { kelas: true } },
      },
      where: { nama: { contains: nama } },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getSiswaById = (req, res, next) => {
  const { id } = req.params;
  prisma.siswa
    .findUnique({
      where: { id },
      select: {
        id: true,
        nama: true,
        nisn: true,
        kelas: { select: { kelas: true } },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getSiswaByKelas = (req, res, next) => {
  const { id } = req.params;
  prisma.siswa
    .findMany({
      where: { kelasId: id },
      select: {
        id: true,
        nama: true,
        nisn: true,
        kelas: { select: { kelas: true } },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

const createSiswa = (req, res, next) => {
  const { nama, nisn, kelasId } = req.body;
  argon.hash(nisn).then((hashed) => {
    prisma.siswa
      .create({
        data: {
          nama,
          nisn,
          kelas: { connect: { id: kelasId } },
          User: { create: { username: nisn, password: hashed, role: "USER" } },
        },
      })
      .then(() => {
        res.status(201).json({ message: "create success" });
      })
      .catch((error) => {
        next(error);
      });
  });
};

const updateSiswa = (req, res, next) => {
  const { id } = req.params;
  const { nama, nisn, kelasId } = req.body;
  prisma.siswa
    .update({ where: { id }, data: { nama, nisn, kelasId } })
    .then(() => {
      res.status(200).json({ message: "update success" });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

const deleteSiswa = (req, res, next) => {
  const { id } = req.params;
  prisma.siswa
    .delete({ where: { id } })
    .then((data) => {
      prisma.user
        .delete({ where: { id: data.userId } })
        .then(() => {
          res.status(200).json({ message: "delete success" });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswaByKelas,
};
