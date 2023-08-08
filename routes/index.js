const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// rutas a nuestras celebrities y movies

const celebrityRouter = require("./celebrities.routes.js");
router.use("/celebrities", celebrityRouter);

const movieRouter = require("./movies.routes.js");
router.use("/movies", movieRouter);

module.exports = router;
