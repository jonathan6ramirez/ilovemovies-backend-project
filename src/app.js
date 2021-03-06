if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

//Theaters, movies, and reviews routers
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router")

app.use(express.json());

app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);

//Not found handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: `Not found ${req.originalUrl}`,
    });
})

//Error handler
app.use((error, req, res, next) => {
    console.log(error);
    const { status = 500, message = `Something went wrong!`} = error;
    res.status(status).json({ error: message });
})

module.exports = app;
