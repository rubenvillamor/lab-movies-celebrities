const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrityRouter = require("./celebrities.routes.js")
router.use("/celebrity", celebrityRouter)

const movieRouter = require("./movies.routes.js")
router.use("/movie", movieRouter)

module.exports = router;
