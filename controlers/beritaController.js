const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBeritaPagination = (req, res, next) => {
  const { take, skip } = req.params;
  prisma.berita
    .count()
    .then((length) => {
      prisma.berita
        .findMany({
          take: take,
          skip: skip,
          orderBy: { tanggal: "desc" },
          include: {
            author: { select: { username } },
          },
        })
        .then((data) => {
          res.status(200).json({ length: length, list: data });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

const getAllBerita = (req, res, next) => {
  prisma.berita
    .findMany({
      orderBy: { tanggal: "desc" },
      include: {
        author: { select: { username } },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getBeritaById = (req, res, next) => {
  const { id } = req.params;
  prisma.berita
    .findUnique({ where: { idBerita: id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const createBerita = (req, res, next) => {
  const { title, image, artikel, author } = req.body;
  prisma.berita
    .create({ data: { title, image, artikel, author } })
    .then(() => {
      res.status(201).json({ message: "create success" });
    })
    .catch((error) => {
      next(error);
    });
};

const updateBerita = (req, res, next) => {
  const { id } = req.params;
  const { title, image, artikel, author } = req.body;
  prisma.guru
    .update({
      where: { idBerita: id },
      data: { title, image, artikel, author },
    })
    .then(() => {
      res.status(200).json({ message: "update success" });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteBerita = (req, res, next) => {
  const { id } = req.params;
  prisma.berita
    .delete({ where: { idBerita: id } })
    .then(() => {
      res.status(200).json({ message: "delete success" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllBerita,
  getBeritaById,
  createBerita,
  deleteBerita,
  updateBerita,
  getBeritaPagination,
};
