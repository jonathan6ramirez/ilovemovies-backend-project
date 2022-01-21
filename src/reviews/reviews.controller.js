const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//helper function for the list crud function
const findCritic = async (critic_id) => {
    return await reviewsService.findCritic(critic_id);
} 

async function reviewExists (req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review ${req.params.reviewId} cannot be found.`});
}

function read(req, res){
    const { review: data } = res.locals;
    res.json({ data });
}

async function list(req, res) {
    const { movieId } = req.params;
    let data;
    if (movieId){
        let dataToFilter = await reviewsService.list();
        dataToFilter = dataToFilter.filter((review) => review.movie_id == movieId)
        for (let i = 0; i < dataToFilter.length; i++){
            const critic = await reviewsService.findCritic(dataToFilter[i].critic_id);
            dataToFilter[i] = { ...dataToFilter[i], 'critic': critic[0]}
        }
        data = dataToFilter;
    } else {
        data = await reviewsService.list();
    }
    res.json({ data }); 
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    await reviewsService.update(updatedReview);
    const updated = await reviewsService.read(res.locals.review.review_id)
    const critic = await reviewsService.findCritic(updated.critic_id);
    const data = { ...updated, 'critic': critic[0]};
    res.json({ data });
}
async function destroy(req, res, next) {
    await reviewsService.delete(res.locals.review.review_id);
    res.sendStatus(204)
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    list: asyncErrorBoundary(list),
    upate: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}