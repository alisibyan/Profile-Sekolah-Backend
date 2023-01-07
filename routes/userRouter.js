const express = require("express");
const router = express.Router();

const {
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controlers/userController");

router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
