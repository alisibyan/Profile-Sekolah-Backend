const express = require("express");
const router = express.Router();

const {
  getAllBerita,
  getBeritaById,
  getBeritaPagination,
  createBerita,
  deleteBerita,
  updateBerita,
} = require("../controlers/beritaController");

router.get("/berita", getAllBerita);
router.get("/berita/:id", getBeritaById);
router.get("/berita/:take/:skip", getBeritaPagination);
router.post("/berita", createBerita);
router.patch("/berita/:id", updateBerita);
router.delete("/berita/:id", deleteBerita);

module.exports = router;
