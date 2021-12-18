const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists (req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Product cannot be found.`});
}

function read(req, res){
    const { review: data } = res.locals;
    res.json({ data });
}

async function list(req, res) {
    const data = await reviewsService.list();
    res.json({ data }); 
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    const updated = await reviewsService.update(updatedReview);
    const critic = await reviewsService.findCritic(updated.critic_id);
    const data = { ...updated, ...critic};
    console.log(data, "this is the data that is returned")
    res.json({ data });
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    list: asyncErrorBoundary(list),
    upate: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
}