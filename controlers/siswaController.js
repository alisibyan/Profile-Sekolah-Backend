const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSiswa = (req, res, next) => {
  prisma.siswa
    .findMany()
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
    .findUnique({ where: { idSiswa: id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const createSiswa = (req, res, next) => {
  const { nama, nisn, jurusan } = req.body;
  prisma.siswa
    .create({ data: { nisn, nama, jurusan } })
    .then(() => {
      res.status(201).json({ message: "create success" });
    })
    .catch((error) => {
      next(error);
    });
};

const updateSiswa = (req, res, next) => {
  const { id } = req.params;
  const { nisn, nama, jurusan } = req.body;
  prisma.siswa
    .update({ where: { idSiswa: id }, data: { nisn, nama, jurusan } })
    .then(() => {
      res.status(201).json({ message: "update success" });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteSiswa = (req, res, next) => {
  const { id } = req.params;
  prisma.siswa
    .delete({ where: { idSiswa: id } })
    .then(() => {
      res.status(201).json({ message: "delete success" });
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
};
