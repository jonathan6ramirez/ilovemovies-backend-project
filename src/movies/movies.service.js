const knex = require("../db/connection");

function read(movie_id){
    return knex("movies").select("*")
        .where({"movie_id": movie_id})
        .first();
};

function list() {
    return knex("movies").select("*");
}
//if the query is_showing is `true` then return
// only the movies that are showing
function listShowing() {
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*", "mt.is_showing")
        .where({ "mt.is_showing": true});
}

module.exports = {
    read,
    list,
    listShowing,
}