const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../client.cjs");

// POST auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing username or password");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.status(200).send({ message: "User logged in", token });
  } catch (error) {
    console.error(error);
  }
});

// POST auth/register
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
