const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJurusan = (req, res, next) => {
  prisma.jurusan
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getJurusanById = (req, res, next) => {
  const { id } = req.params;
  prisma.jurusan
    .findUnique({
      where: {
        idJurusan: id,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const createJurusan = (req, res, next) => {
  const { kodeJurusan, namaJurusan } = req.body;
  prisma.jurusan
    .create({ data: { kodeJurusan: kodeJurusan, namaJurusan: namaJurusan } })
    .then(() => {
      res.status(201).json({ message: "create success" });
    })
    .catch((error) => {
      next(error);
    });
};

const updateJurusan = (req, res, next) => {
  const { id } = req.params;
  const { kodeJurusan, namaJurusan } = req.body;
  prisma.jurusan
    .update({
      where: { idJurusan: id },
      data: { kodeJurusan: kodeJurusan, namaJurusan: namaJurusan },
    })
    .then(() => {
      res.status(200).json({ message: "update success" });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteJurusan = (req, res, next) => {
  const { id } = req.params;
  prisma.jurusan
    .delete({ where: { idJurusan: id } })
    .then(() => {
      res.status(200).json({ message: "delete success" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllJurusan,
  getJurusanById,
  createJurusan,
  updateJurusan,
  deleteJurusan,
};
