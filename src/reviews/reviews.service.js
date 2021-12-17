const knex = require("../db/connection");

function read (reviewId) {
    return knex("reviews").select("*").where({reviewId}).first();
}

modele.exports = {
    read,
}