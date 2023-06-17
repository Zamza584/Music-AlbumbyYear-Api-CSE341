const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    albumName: String,
    albumArtist: String,
    albumRelease: String,
    albumLink: String,
    albumTTracks: String,
    albumImage: String,
    user_id: String
});

module.exports = mongoose.model("albums", albumSchema);
