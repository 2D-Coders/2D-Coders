const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const ViteExpress = require("vite-express");
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./API/index.cjs"));
app.use("/auth", require("./API/auth.cjs"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
