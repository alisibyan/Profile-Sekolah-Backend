const imageHelper = require("../helper/imageBuffer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBeritaPagination = (req, res, next) => {
  const { take, skip } = req.params;
  prisma.berita
    .count()
    .then((length) => {
      prisma.berita
        .findMany({
          take: parseInt(take),
          skip: parseInt(skip),
          orderBy: { tanggal: "desc" },
          include: { author: { select: { username: true } } },
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
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

const getBeritaById = (req, res, next) => {
  const { id } = req.params;
  prisma.berita
    .findUnique({
      where: { id },
    })
    .then((data) => {
      res.status(200).json({ ...data, artikel: data.artikel.toString("utf8") });
    })
    .catch((error) => {
      next(error);
    });
};

const createBerita = async (req, res, next) => {
  const { title, image, artikel } = req.body;

  try {
    await prisma.berita.create({
      data: {
        title,
        image: image,
        artikel: Buffer.from(artikel, "utf-8"),
      },
    });

    res.status(201).json({ message: "create success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBerita = async (req, res, next) => {
  const { id } = req.params;
  const { title, image, artikel } = req.body;

  try {
    await prisma.berita.update({
      where: { id },
      data: {
        artikel: Buffer.from(artikel, "utf-8"),
        title: title,
        image,
      },
    });

    res.status(200).json({ message: "update success" });
  } catch (error) {
    next(error);
  }
};

const deleteBerita = (req, res, next) => {
  const { id } = req.params;

  prisma.berita
    .delete({ where: { id } })
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
