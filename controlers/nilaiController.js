const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createNilai = async (req, res, next) => {
  const { nilai, siswa, pelajaran } = req.body;

  try {
    const findNilai = await prisma.nilai.findFirst({
      where: { siswaId: siswa, pelajaranId: pelajaran },
    });

    if (!findNilai) {
      await prisma.nilai.create({
        data: {
          nilai: Number(nilai),
          pelajaran: { connect: { id: pelajaran } },
          siswa: { connect: { id: siswa } },
        },
      });
      res.status(201).json({ message: "create success" });
    } else {
      await prisma.nilai.update({
        where: { id: findNilai.id },
        data: {
          nilai: Number(nilai),
          pelajaran: { connect: { id: pelajaran } },
          siswa: { connect: { id: siswa } },
        },
      });
      res.status(201).json({ message: "create success" });
    }
  } catch (error) {
    next(error);
  }
};

const updateNilai = async (req, res, next) => {
  const { nilai, siswa, pelajaran } = req.body;
  const { id } = req.params;

  try {
    await prisma.nilai.update({
      where: { id },
      data: {
        nilai: Number(nilai),
        pelajaran: { connect: { id: pelajaran } },
        siswa: { connect: { id: siswa } },
      },
    });
    res.status(200).json({ message: "update success" });
  } catch (error) {
    next(error);
  }
};

const getUserNilai = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await prisma.nilai.findMany({
      where: { siswaId: id },
      select: { id: true, pelajaran: { select: { nama: true } }, nilai: true },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteNilai = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.nilai.delete({ where: { id } });
    res.status(200).json({ message: "success delete" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNilai,
  updateNilai,
  getUserNilai,
  deleteNilai,
};
