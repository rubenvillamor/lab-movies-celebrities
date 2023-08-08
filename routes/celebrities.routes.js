// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const express = require("express");
const router = express.Router();

// all your routes here

const Celebrity = require("../models/Celebrity.model.js");

// RUTAS

// GET "/celebrity/create" => esto renderiza la pagina para crear una celebridad
router.get("/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity.hbs");
});

// POST "/celebrity/create" => esto crea la celebrity en la base de datos
router.post("/create", async (req, res, next) => {
  // campos de validacion
  console.log(req.body);
  if (
    req.body.name === "" ||
    req.body.occupation === "" ||
    req.body.catchPhrase === ""
  ) {
    res.status(404).render("./celebrities/new-celebrity.hbs", {
      errorMessage: "Todos los campos son obligatorios",
      previousName: req.body.name,
      previousOccupation: req.body.occupation,
      previousCatchPhrase: req.body.catchPhrase,
    });
    return;
  }

  try {
    await Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

// get /celebrities listar todas
router.get("/", async (req, res, next) => {
try {
  const response = await Celebrity.find()
  
  res.render("./celebrities/celebrities.hbs",{
    allCelebrities : response
  })
} catch (error) {
  next(error)
}
} )

module.exports = router;
