const lodash = require('lodash');
const { Op } = require('sequelize');
const { Movie } = require('../models');

const findAllMovies = async (req, res) => {
    const { title } = req.query;

    if (title) {
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.or]: {
                        [Op.substring]: title
                    }
                }
            }
        });
        return res.json(movies);
    }
    else {
        const movies = await Movie.findAll({ raw: true });
        return res.json(movies);
    }
}

const findByMovieId = async (req, res) => {
    const { title } = req.params;

    
    const movie = await Movie.findOne({
        where: {
            title: String(title)
        }
    })
    if (!movie) {
        return res.status(404).json({
            message: "Movie Id not found!"
        });
    }
    res.json(movie);
}

const createMovie = async (req, res) => {

    const { title, poster} = req.body;
    if (!title || !poster) {
        return res.status(400).json({ message: "Please fill all the mandatory fields[title, poster]" });
    }

    const movieRecord = {
        title,
        poster
    }

    const result = await Movie.create(movieRecord);
    if (result) {
        return res.json({ message: "Movie added successfully..." });
    } else {
        return res.json({ message: "Movie not added" });
    }
}

module.exports = {
    findAllMovies,
    findByMovieId,
    createMovie
}