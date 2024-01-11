const express = require("express");
const router = express.Router();

router.use("/users", require("./users.cjs"));
router.use("/games", require("./games.cjs"));
router.use("/highscores", require("./highscores.cjs"));

module.exports = router;
