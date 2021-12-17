const theatersService = require("./theaters.service");

function groupMoviesToTheaters(data) {
    //init array to be returned
    let groupedMovies = [];
    
    //Loop through 
    for ( let i = 0; i < data.length; i++){
        //data is just there for placeholder for now
        const check = groupedMovies.filter((theater) => theater.theater_id == data[i].theater_id);

        if (check.length == 0){
            const theater = {
                "theater_id": data[i].theater_id,
                "name": data[i].name,
                "address_line_1": data[i].address_line_1,
                "address_line_2": data[i].address_line_2,
                "city": data[i].city,
                "state": data[i].state,
                "zip": data[i].zip,
                "movies": [],
            }
            const movie = {
                "movie_id": data[i].movie_id,
                "title": data[i].title,
                "runtime_in_minutes": data[i].runtime_in_minutes,
                "rating": data[i].rating,
                "description": data[i].description,
                "image_url": data[i].image_url
            }
            theater.movies.push(movie);
            groupedMovies.push(theater)
        }
        else if(data.length > 0){
            //Create the movie object
            const movie = {
                "movie_id": data[i].movie_id,
                "title": data[i].title,
                "runtime_in_minutes": data[i].runtime_in_minutes,
                "rating": data[i].rating,
                "description": data[i].description,
                "image_url": data[i].image_url
            }
            //Find the index of the theater
            const index = groupedMovies.findIndex((theater) => theater.theater_id == data[i].theater_id)
            //Push the movie to the array of the current movie
            groupedMovies[index].movies.push(movie);
        }
    }
    console.log(groupedMovies, "this is the data after the movies are grouped together according to the theater_id");
    //return the grouped array
    //return groupedMovies;
}




function list(req, res, next) {
    theatersService
        .list()
        .then((data) => groupMoviesToTheaters(data))
        .then((data) => res.json(data))
        .catch(next);
}

module.exports = {
    list,
}