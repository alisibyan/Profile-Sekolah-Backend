const express = require("express");
const router = express.Router();

const {
  getAllKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
} = require("../controlers/kelasController");

router.get("/kelas", getAllKelas);
router.get("/kelas/:id", getKelasById);
router.post("/kelas", createKelas);
router.patch("/kelas/:id", updateKelas);
router.delete("/kelas/:id", deleteKelas);

module.exports = router;
