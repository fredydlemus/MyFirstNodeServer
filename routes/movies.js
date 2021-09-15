const express = require('express');

const { moviesMock } = require('../utils/mocks/movies');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    router.get("/", async function(req, res, next){
        try{

            const movies = await Promise.resolve(moviesMock);
            res.status(200).json({
                data: movies,
                message: 'movies'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.get("/:movieID", async function(req, res, next){
        try{

            const movies = await Promise.resolve(moviesMock[0]);
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.post("/", async function(req, res, next){
        try{

            const createMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.put("/:movieId", async function(req, res, next){
        try{

            const updatedMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data: updatedMovieId,
                message: 'movies update'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.delete("/:movieId", async function(req, res, next){
        try{

            const deletedMovie = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data: deletedMovie,
                message: 'movie deleted'
            });
        

        }catch(err){
            next(err);
        }
    });
}

module.exports = moviesApi;