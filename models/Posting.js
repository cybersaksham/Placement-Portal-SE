const mongoose = require("mongoose");

const PostingSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: "company", require: true },
    role: { type: String, require: true },
    branches: { type: [String] },
    minCGPA: { type: Number },
    location: { type: String },
    joiningDate: { type: Date },
    isClosed: { type: Boolean, default: false }
});

module.exports = mongoose.model("posting", PostingSchema);