const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
  Celebrity.find()
  .then((allCelebrities) => {
    res.render('movies/new-movie', {celebrities: allCelebrities})
  })
  .catch(err => console.log("error getting all celebs", err))
})

router.post('/create', (req, res) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  })
  .then((newMovie) => {
    console.log("new movie wooo!", newMovie)
    res.redirect('/movies/movies')
  })
  .catch((err) => {
    console.log("error creating new movie", err)
    res.render('movies/new-movie')
  })
})

router.get('/movies', (req, res) => {
  Movie.find()
  .then((allMovies) => {
    res.render('movies/movies', { movies: allMovies })
  })
  .catch((err) => console.log("error getting all movies", err))
})

router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
  .populate("cast")
  .then((results) => {
    res.render('movies/movie-details', results)
  })
})

router.post('/:id/delete', (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
  .then((results) => {
    res.redirect('/movies/movies')
  })
  .catch(err => console.log(err))
})


router.get('/:id/edit', (req, res) => {
  Movie.findById(req.params.id)
  .then((results) => {
    Celebrity.find()
    .then((celebrities) => {
      res.render('movies/edit-movie', {results, celebrities})
    })
    .catch(err => console.log(err))
  })
})

router.post('/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  })
  .then((results)=> {
    console.log("UPDATEDDDDDDD")
    res.redirect('/movies/movies')
  })
  .catch(err => console.log)
})

module.exports = router;