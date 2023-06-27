const express = require("express");
const router = express.Router();

const {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswaByKelas,
} = require("../controlers/siswaController");

router.get("/siswa", getAllSiswa);
router.get("/siswa/kelas/:id", getSiswaByKelas);
router.get("/siswa/:id", getSiswaById);
router.post("/siswa", createSiswa);
router.patch("/siswa/:id", updateSiswa);
router.delete("/siswa/:id", deleteSiswa);

module.exports = router;
