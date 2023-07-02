const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createNilai = async (req, res, next) => {
  const { siswa, pelajaran, nilaiUh1, nilaiUh2, nilaiUh3, nilaiUts, nilaiUas } =
    req.body;

  const dataNilai = [
    { name: "nilaiUh1", nilai: nilaiUh1 },
    { name: "nilaiUh2", nilai: nilaiUh2 },
    { name: "nilaiUh3", nilai: nilaiUh3 },
    { name: "nilaiUts", nilai: nilaiUts },
    { name: "nilaiUas", nilai: nilaiUas },
  ];

  const formattedObject = {};

  dataNilai
    .filter((nilai) => nilai.nilai)
    .forEach((item) => {
      formattedObject[item.name] = Number(item.nilai);
    });

  try {
    const findNilai = await prisma.nilai.findFirst({
      where: { siswaId: siswa, pelajaranId: pelajaran },
    });

    if (!findNilai) {
      await prisma.nilai.create({
        data: {
          ...formattedObject,
          pelajaran: { connect: { id: pelajaran } },
          siswa: { connect: { id: siswa } },
        },
      });
      res.status(201).json({ message: "create success" });
    } else {
      await prisma.nilai.update({
        where: { id: findNilai.id },
        data: {
          ...formattedObject,
          pelajaran: { connect: { id: pelajaran } },
          siswa: { connect: { id: siswa } },
        },
      });
      res.status(201).json({ message: "create success" });
    }
  } catch (error) {
    console.log(error);
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
      select: {
        id: true,
        pelajaran: { select: { nama: true } },
        nilaiUas: true,
        nilaiUh1: true,
        nilaiUh2: true,
        nilaiUh3: true,
        nilaiUts: true,
      },
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
