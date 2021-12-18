const knex = require("../db/connection");

function read(movie_id){
    return knex("movies").select("*").where({"movie_id": movie_id})
};

function list() {
    return knex("movies").select("*");
}

module.exports = {
    read,
    list,
}