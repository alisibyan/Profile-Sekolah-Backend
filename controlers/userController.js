const { PrismaClient } = require("@prisma/client");
const argon = require("argon2");
const prisma = new PrismaClient();

const getAllUser = (req, res, next) => {
  prisma.user
    .findMany()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  prisma.user
    .findUnique({
      where: {
        idUser: id,
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
};

const createUser = (req, res, next) => {
  const { username, password } = req.body;

  argon
    .hash(password)
    .then((hashed) => {
      prisma.user
        .create({
          data: {
            username: username,
            password: hashed,
          },
        })
        .then(() => {
          res.status(201).json({ message: "data created" });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { id } = req.params;
  const { username, password } = req.body;
  prisma.user
    .update({
      where: { idUser: id },
      data: { username: username, password: password },
    })
    .then(() => {
      res.status(200).json({ message: "update succcess" });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  prisma.user
    .delete({ where: { idUser: id } })
    .then(() => {
      res.status(200).json({ message: "delete success" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
