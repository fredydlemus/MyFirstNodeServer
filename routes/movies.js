const express = require('express');
const MoviesServices = require ('../services/movies');



function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesServices();

    

    router.get("/", async function(req, res, next){
        const { tags } = req.query;
        try{

            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.get("/:movieId", async function(req, res, next){
        const { movieId } = req.params;
        
        try{

            const movies = await moviesService.getMovie({ movieId });
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.post("/", async function(req, res, next){
        
        const { body: movie } = req;
        try{

            const createMovieId = await moviesService.createMovie({ movie });
            console.log(createMovieId);
            res.status(201).json({
                
                data: createMovieId,
                message: 'movie created'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.put("/:movieId", async function(req, res, next){
        const { movieId } = req.params;
        const { body: movie } = req;
        try{

            const updatedMovieId = await moviesService.updateMovie({ movieId, movie});
            res.status(200).json({
                data: updatedMovieId,
                message: 'movies update'
            });
        

        }catch(err){
            next(err);
        }
    });

    router.patch("/:movieId", async function(req, res, next){
        const { movieId } = req.params;
        const { body:movie } = req;
        try{
            const updateMovieIdPatch = await moviesService.updateMoviePatch({ movieId, movie});
            res.status(200).json({
                data: updateMovieIdPatch,
                message: 'movie update with PATCH'
            });
        }catch(err){
            next(err)
        }
    })

    router.delete("/:movieId", async function(req, res, next){
        const { movieId } = req.params
        try{

            const deletedMovie = await moviesService.deleteMovie({ movieId});
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