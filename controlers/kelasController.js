const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllKelas = (req, res, next) => {
  prisma.kelas
    .findMany({
      include: {
        waliKelas: {
          select: {
            nama: true,
            idGuru: true,
          },
        },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getKelasById = (req, res, next) => {
  const { id } = req.params;
  prisma.kelas
    .findUnique({
      where: {
        idKelas: id,
      },
      include: {
        waliKelas: {
          select: {
            nama: true,
            idGuru: true,
          },
        },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const createKelas = (req, res, next) => {
  const { kelas, waliKelas } = req.body;

  prisma.kelas
    .create({
      data: {
        kelas: kelas,
        guruIdGuru: waliKelas,
      },
    })
    .then(() => {
      res.status(201).json({ message: "create success" });
    })
    .catch((error) => {
      next(error);
    });
};

const updateKelas = (req, res, next) => {
  const { id } = req.params;
  const { kelas, waliKelas } = req.body;
  prisma.kelas
    .update({
      where: { idKelas: id },
      data: { kelas: kelas, guruIdGuru: waliKelas },
    })
    .then(() => {
      res.status(200).json({ message: "update success" });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteKelas = (req, res, next) => {
  const { id } = req.params;
  prisma.kelas
    .delete({ where: { idKelas: id } })
    .then(() => {
      res.status(200).json({ message: "delete success" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
};
