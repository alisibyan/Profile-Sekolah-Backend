const express = require("express");
const router = express.Router();

const {
  getAllGuru,
  getGuruById,
  deleteGuru,
  updateGuru,
  createGuru,
} = require("../controlers/guruController");

router.get("/guru", getAllGuru);
router.get("/guru/:id", getGuruById);
router.post("/guru", createGuru);
router.patch("/guru/:id", updateGuru);
router.delete("/guru/:id", deleteGuru);

module.exports = router;
