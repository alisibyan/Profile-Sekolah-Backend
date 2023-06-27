const express = require("express");
const router = express.Router();

const {
  createPelajaran,
  getAllPelajaran,
  deletePelajaran,
  updatePelajaran,
} = require("../controlers/pelajaranController");

router.post("/pelajaran", createPelajaran);
router.get("/pelajaran", getAllPelajaran);
router.put(`/pelajaran/:id`, updatePelajaran);
router.delete(`/pelajaran/:id`, deletePelajaran);

module.exports = router;
