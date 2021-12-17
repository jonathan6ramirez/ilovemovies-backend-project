const theatersService = require("./theaters.service");

function groupMoviesToTheaters(data) {
    //init array to be returned
    let groupedMovies = [];

    //loop through data
    //console.log(data);
    //!groupedMovies.includes(data[i].theater_id)
    //filter for theater_id
    //
    for ( let i = 0; i < data.length; i++){
        //data is just there for placeholder for now
        if (!data){
            console.log("didnt find the theater")
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
        //else if()
    }
        //check to see if the current theater is in the array
        //if it isnt add it to the array
        //if it is then just add the movie to the array of movies of the theater

    //return the grouped array
}




function list(req, res, next) {
    theatersService
        .list()
        .then((data) => groupMoviesToTheaters(data))
        .catch(next);
}

module.exports = {
    list,
}