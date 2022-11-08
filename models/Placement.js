const mongoose = require("mongoose");

const PlacementSchema = new mongoose.Schema({
    posting: { type: mongoose.Schema.Types.ObjectId, ref: "job_posts", require: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student", require: true },
});

module.exports = mongoose.model("placement", PlacementSchema);