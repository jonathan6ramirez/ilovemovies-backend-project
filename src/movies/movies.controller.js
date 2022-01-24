const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found`})
}

//CRUD functions
function read(req, res){
    const { movie: data } = res.locals;
    res.json({ data });
}

async function list(req, res) {
    const is_showing = req.query.is_showing;
    let data;
    if (is_showing){
        data = await moviesService.listShowing();
    } else {
        data = await moviesService.list();
    }
    res.json({ data });
}
module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
    list: asyncErrorBoundary(list),
}
