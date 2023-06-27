const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = await prisma.user.findFirst({ where: { username } });
    if (!getUser) return res.status(404).json({ message: "user not found" });

    const match = await argon2.verify(getUser.password, password);
    if (!match) return res.status(404).json({ message: "password not match" });

    const accessToken = generateAccessToken({ username });

    res.status(200).json({
      accessToken,
      user: {
        id: getUser.id,
        username: getUser.username,
        role: getUser.role,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET);
};

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401).json({ message: "unauthorize" });

  jwt.verify(token, process.env.SECRET, (err, username) => {
    if (err) return res.status(403).json({ message: "token is not valid" });
    req.username = username;
    next();
  });
};

module.exports = { login, authToken };
