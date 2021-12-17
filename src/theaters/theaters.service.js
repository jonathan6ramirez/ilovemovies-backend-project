const knex = require("../db/connection");

function list() {
    return knex("theaters as t")
        .distinct()
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.*", "m.*")
        .where({ "mt.is_showing": true});
}

module.exports = {
    list,
}