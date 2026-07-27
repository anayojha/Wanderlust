const express = require("express")
const router = express.Router({mergeParams : true})
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/review");
const {reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js")
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewcontroller = require("../controllers/review.js")


//Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewcontroller.createReview))

// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.destroyreview));

module.exports = router