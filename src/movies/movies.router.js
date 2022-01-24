const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const cors = require("cors");

const corsGet = cors({ methods: "GET" })

router.use("/:movieId/theaters", corsGet, theatersRouter)
    .options(corsGet);
router.use("/:movieId/reviews", corsGet, reviewsRouter)
    .options(corsGet);

router.route("/")
    .get(corsGet, controller.list)
    .options(corsGet)
    .all(methodNotAllowed);

router.route("/:movieId([0-9]+)")
    .get(corsGet, controller.read)
    .options(corsGet);


module.exports = router;