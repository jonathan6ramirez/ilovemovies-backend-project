const router = require("express").Router({ mergeParams: true });;
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);


router.route("/:reviewId([0-9]+)")
    .get(controller.read)
    .put(controller.upate)
    .all(methodNotAllowed);

module.exports = router;