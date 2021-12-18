const knex = require("../db/connection");

function read (reviewId) {
    return knex("reviews").select("*").where({"review_id": reviewId}).first();
}
function list() {
    return knex("reviews").select("*")
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ "reviewId": updatedReview.review_id})
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0])
}
function findCritic(critic_id) {
    return knex("critics")
        .select("*")
        .where({ "critic_id": critic_id})
}

module.exports = {
    read,
    list,
    findCritic,
}