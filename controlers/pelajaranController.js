const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPelajaran = async (req, res, next) => {
  const { nama, guru } = req.body;

  try {
    await prisma.pelajaran.create({
      data: { nama, guru: { connect: { id: guru } } },
    });
    res.status(201).json({ message: "create success" });
  } catch (error) {
    next(error);
  }
};

const updatePelajaran = async (req, res, next) => {
  const { nama, guru } = req.body;
  const { id } = req.params;

  try {
    await prisma.pelajaran.update({
      where: { id },
      data: { nama, guru: { connect: { id: guru } } },
    });
    res.status(201).json({ message: "create success" });
  } catch (error) {
    next(error);
  }
};

const deletePelajaran = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.pelajaran.delete({ where: { id } });
    res.status(200).json({ message: "delete success" });
  } catch (error) {
    next(error);
  }
};

const getAllPelajaran = async (req, res, next) => {
  try {
    const data = await prisma.pelajaran.findMany({
      select: { id: true, nama: true, guru: { select: { nama: true } } },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPelajaran,
  getAllPelajaran,
  deletePelajaran,
  updatePelajaran,
};
