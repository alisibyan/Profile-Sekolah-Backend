const express = require("express");
const router = express.Router();

const { media } = require("../controlers/mediaController");

router.get("/media/:filename", media);

module.exports = router;
