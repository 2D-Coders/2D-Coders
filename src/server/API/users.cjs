const express = require("express");
const router = express.Router();
const prisma = require("../client.cjs");
const jwt = require("jsonwebtoken");

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const getUsers = await prisma.user.findMany();
    res.send(getUsers);
  } catch (error) {
    console.error(error);
  }
});

// GET /api/users/me
router.get("/me", async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.send({ user: "notLoggedIn" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.send({ user: "notLoggedIn" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    res.send(user);
  } catch (error) {
    res.send({ message: "Invalid Token", user: "notLoggedIn" });
    return;
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const singleUser = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  res.send(singleUser);
});

module.exports = router;
