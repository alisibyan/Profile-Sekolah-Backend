const express = require("express");
const router = express.Router();

const {
  getAllJurusan,
  getJurusanById,
  deleteJurusan,
  updateJurusan,
  createJurusan,
} = require("../controlers/jurusanController");

router.get("/jurusan", getAllJurusan);
router.get("/jurusan/:id", getJurusanById);
router.post("/jurusan", createJurusan);
router.patch("/jurusan/:id", updateJurusan);
router.delete("/jurusan/:id", deleteJurusan);

module.exports = router;
