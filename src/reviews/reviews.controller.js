const knex = require("../db/connection");
const reviewsService = require("./reviews.service");

function reviewExists (req, res, next) {
    reviewsService
        .read(req.params.reviewId)
        .then((review) => {
            if (review) {
                res.locals.review = review;
                return next();
            }
            next({ status: 404, message: `Review cannot be found.`})
        })
        .catch(next);
}