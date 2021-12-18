//Notes: To find the section that has the query references goto node & express: query and route parameters
const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({ status: 500, message: `Movie cannot be found`})
}

//CRUD functions
function read(req, res){
    const { movie: data } = res.locals;
    res.json({ data });
}
module.exports = {

}