const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema({
    posting: { type: mongoose.Schema.Types.ObjectId, ref: "posting", require: true },
    ctc: { type: String, require: true },
    shares: { type: String },
});

module.exports = mongoose.model("job_posts", JobPostSchema);