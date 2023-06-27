const express = require("express");
const router = express.Router();

const {
  createNilai,
  updateNilai,
  getUserNilai,
  deleteNilai,
} = require("../controlers/nilaiController");

router.post("/input-nilai", createNilai);
router.put("/input-nilai/:id", updateNilai);
router.get("/input-nilai/siswa/:id", getUserNilai);
router.delete("/input-nilai/:id", deleteNilai);

module.exports = router;
