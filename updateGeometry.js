require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");

    await updateListings();

    mongoose.connection.close();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateListings() {
    const listings = await Listing.find({});

    for (let listing of listings) {

        if (listing.geometry && listing.geometry.coordinates.length > 0) {
            continue;
        }

        await sleep(1000)

        try {
         const response = await axios.get(
         "https://api.openrouteservice.org/geocode/search",
         {
            params: {
            api_key: process.env.ORS_API_KEY,
            text: `${listing.location}, ${listing.country}`,
            size: 1,
            },
        }
        );

            if (response.data.features.length > 0) {

            listing.geometry = {
            type: "Point",
            coordinates: response.data.features[0].geometry.coordinates,
           };

    await listing.save();

    console.log(`Updated: ${listing.title}`);

} else {

    console.log(`No coordinates found for ${listing.title}`);

}

        } catch (err) {

            console.log(`Error updating ${listing.title}: ${err.message}`);

        }
    }

    console.log("Done!");
}
console.log(process.env.ORS_API_KEY);
main().catch(console.error);