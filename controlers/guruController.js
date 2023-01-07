const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllGuru = (req, res, next) => {
  prisma.guru
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getGuruById = (req, res, next) => {
  const { id } = req.params;
  prisma.guru
    .findUnique({ where: { idGuru: id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const createGuru = (req, res, next) => {
  const { nama, jabatan } = req.body;
  prisma.guru
    .create({ data: { nama, jabatan } })
    .then(() => {
      res.status(201).json({ message: "create success" });
    })
    .catch((error) => {
      next(error);
    });
};

const updateGuru = (req, res, next) => {
  const { id } = req.params;
  const { nama, jabatan } = req.body;
  prisma.guru
    .update({ where: { idGuru: id }, data: { nama, jabatan } })
    .then(() => {
      res.status(201).json({ message: "update success" });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteGuru = (req, res, next) => {
  const { id } = req.params;
  prisma.guru
    .delete({ where: { idGuru: id } })
    .then(() => {
      res.status(201).json({ message: "delete success" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru,
};
