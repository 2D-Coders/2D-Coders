const express = require("express");
const router = express.Router();
const prisma = require("../client.cjs");

// GET /api/games
router.get("/", async (req, res) => {
  try {
    const getAllGames = await prisma.game.findMany();
    res.send(getAllGames);
  } catch (error) {
    console.error(error);
  }
});

// POST /api/games (only admin can create games)

module.exports = router;
