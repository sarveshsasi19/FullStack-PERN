const express = require('express');
const router = express.Router();

const controller = require('../controllers/movieController');


router.get('/', controller.findAllMovies);
router.post('/', controller.createMovie);
router.get('/:movieId', controller.findByMovieId);

module.exports = router;