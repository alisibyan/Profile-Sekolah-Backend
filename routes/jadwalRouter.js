const express = require("express");
const router = express.Router();

const {
  CreateJadwal,
  GetJadwalByKelas,
  DeleteJadwalByKelas,
} = require("../controlers/jadwalController");

router.post("/jadwal", CreateJadwal);
router.get("/jadwal/kelas/:id", GetJadwalByKelas);
router.delete("/jadwal/kelas/:id", DeleteJadwalByKelas);

module.exports = router;
