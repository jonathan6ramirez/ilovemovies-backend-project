const knex = require("../db/connection");

function read (reviewId) {
    return knex("reviews")
        .select("*")
        .where({"review_id": reviewId})
        .first();
}
function list() {
    return knex("reviews").select("*")
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": updatedReview.review_id})
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0])
}
function findCritic(critic_id) {
    return knex("critics")
        .select("*")
        .where({ "critic_id": critic_id})
}

function destroy(review_id){
    return knex("reviews")
        .where({ review_id })
        .del()
}


module.exports = {
    read,
    list,
    findCritic,
    update,
    delete: destroy,
}