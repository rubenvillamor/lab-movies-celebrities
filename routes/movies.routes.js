// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");
// all your routes here

// GET "/movie/create" => esto renderiza la pagina para crear una pelicula
router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find();

    console.log(response);
    res.render("movies/new-movie.hbs", {
      allCelebrities: response,
    });
  } catch (error) {
    next(error);
  }
});

// POST "/movie/create" => esto crea la movie en la base de datos
router.post("/create", async (req, res, next) => {
  // campos de validacion
  console.log(req.body);
  if (
    req.body.title === "" ||
    req.body.genre === "" ||
    req.body.plot === "" ||
    req.body.cast === ""
  ) {
    res.status(404).render("./movies/new-movies.hbs", {
      errorMessage: "Todos los campos son obligatorios",
      previousTitle: req.body.title,
      previousGenre: req.body.genre,
      previousPlot: req.body.plot,
      previousCast: req.body.cast,
    });
    return;
  }

  try {
    await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// get /movies listar todas
router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find();

    res.render("./movies/movies.hbs", {
      allMovies: response,
    });
  } catch (error) {
    next(error);
  }
});

// GET "/movies/:movieId" => esta pagina renderiza con los detalles de 1 pelicula
router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const response = await Movie.findById(movieId).populate("cast");
    console.log("movie details: ", movieId);
    console.log("movie details: ", response);

    res.render("./movies/movie-details.hbs", {
      movieDetails: response,
    });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/:movieId/delete" => esta pagina para borrar la movie
router.post("/:movieId/delete", async (req, res, next) => {
  try {
    const response = await Movie.findByIdAndDelete(req.params.movieId);
    console.log("Movie borrada");
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/:movieId/edit", async (req, res, next) => {
  try {
    
    const response = await Movie.findById(req.params.movieId)
    const allCelebrities = await Celebrity.find().select({name: 1})

    const cloneAllCelebrities = JSON.parse( JSON.stringify(allCelebrities) )
    // clonamos el arr porque los array de documentos, mongo a veces no nos permite modificarlos

    console.log(response)
    cloneAllCelebrities.forEach((eachCelebrity) => {
      if (response.cast.toString() === eachCelebrity._id.toString()) {
        console.log("el seleccionado es:", eachCelebrity)
        eachCelebrity.isSelected = true;
      }
    })
    console.log(cloneAllCelebrities)

    res.render("movies/edit-movie.hbs", {
      oneMovie: response,
      allCelebrities: cloneAllCelebrities
    })
  } catch (error) {
    next(error)
  }
})

router.post("/:movieId/edit", (req, res, next) => {

  const movieId = req.params.movieId; // o hacer destructuracion
  const { title, genre, plot, cast } = req.body

  Movie.findByIdAndUpdate(movieId, {  
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(() => {
    res.redirect("/movies")
  })
  .catch((error) => {
    next(error)
  })

})




module.exports = router;
