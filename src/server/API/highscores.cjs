const express = require("express");
const router = express.Router();
const prisma = require("../client.cjs");

// GET /api/highscore
router.get("/", async (req, res) => {
  try {
    const getHighscores = await prisma.highscore.findMany();
    res.send(getHighscores);
  } catch (error) {
    console.error(error);
  }
});

// GET /api/highscores/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const singleHighscore = await prisma.highscore.findUnique({
    where: {
      id: +id,
    },
  });
  res.send(singleHighscore);
});

// POST /api/highscores
// router.post("/", async (req, res) => {
//   const { score, userId } = req.body;
//   try {
//     const newHighscore = await prisma.highscore.create({
//       data: {
//         score,
//         userId,
//       },
//     });
//     res.send(newHighscore);
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = router;
