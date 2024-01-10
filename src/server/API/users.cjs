const express = require("express");
const router = express.Router();
const prisma = require("../client.cjs");

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const getUsers = await prisma.user.findMany();
    res.send(getUsers);
  } catch (error) {
    console.error(error);
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
