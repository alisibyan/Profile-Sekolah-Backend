const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CreateJadwal = async (req, res, next) => {
  const { hari, jamPelajaran, pelajaran, kelas } = req.body;

  try {
    const findJadwal = await prisma.jadwal.findFirst({
      where: { jamPelajaran: Number(jamPelajaran), kelasId: kelas, hari },
    });

    if (findJadwal) {
      await prisma.jadwal.update({
        where: { id: findJadwal.id },
        data: {
          hari,
          jamPelajaran: Number(jamPelajaran),
          kelas: { connect: { id: kelas } },
          pelajaran: { connect: { id: pelajaran } },
        },
      });

      return res.status(201).json({ message: "update success" });
    }

    await prisma.jadwal.create({
      data: {
        hari,
        jamPelajaran: Number(jamPelajaran),
        kelas: { connect: { id: kelas } },
        pelajaran: { connect: { id: pelajaran } },
      },
    });

    res.status(201).json({ message: "create success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const GetJadwalByKelas = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await prisma.jadwal.findMany({
      where: { kelasId: id },
      select: {
        id: true,
        hari: true,
        jamPelajaran: true,
        kelas: { select: { kelas: true } },
        pelajaran: { select: { nama: true } },
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const DeleteJadwalByKelas = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.jadwal.deleteMany({ where: { kelasId: id } });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  CreateJadwal,
  GetJadwalByKelas,
  DeleteJadwalByKelas,
};
