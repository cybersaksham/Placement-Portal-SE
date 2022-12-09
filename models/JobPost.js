const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema({
    posting: { type: mongoose.Schema.Types.ObjectId, ref: "posting", require: true },
    ctc: { type: Number, require: true },
    shares: { type: String },
});

module.exports = mongoose.models.job_posts || mongoose.model("job_posts", JobPostSchema);