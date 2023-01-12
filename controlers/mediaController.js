const imageHelper = require("../helper/imageBuffer");

const media = async (req, res, next) => {
  const { filename } = req.params;
  return await imageHelper.readFile(filename, res);
};

module.exports = { media };
