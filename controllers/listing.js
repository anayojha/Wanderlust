const axios = require("axios");
const Listing = require("../models/listing")

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", { allListings })
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner")

    if (!listing) {
        req.flash("error", "Listing you have requested for does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing })
}


module.exports.createListing = async (req, res) => {

    const newListing = new Listing(req.body.listing);

    const response = await axios.get(
        "https://api.openrouteservice.org/geocode/search",
        {
            params: {
                api_key: process.env.ORS_API_KEY,
                text: `${newListing.location}, ${newListing.country}`,
                size: 1,
            },
        }
    );

    if (response.data.features.length > 0) {
        newListing.geometry = {
            type: "Point",
            coordinates: response.data.features[0].geometry.coordinates,
        };
    }

    newListing.owner = req.user._id;

    newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
    };

    await newListing.save();

    req.flash("success", "New Listing Added");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "Listing you have requested for does not exist!")
        return res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("listings/edit.ejs", { listing, originalImageUrl })
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing)
    if (typeof req.file !== "undefined") {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        }
    }
    await listing.save();
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing Deleted")
    res.redirect("/listings")
}