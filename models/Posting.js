const mongoose = require("mongoose");

const PostingSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: "company", require: true },
    role: { type: String, require: true },
    branches: { type: [String] },
    minCGPA: { type: Number },
    location: { type: String },
    graduationYear: { type: Number, required: true },
    joiningDate: { type: Date },
    type: { type: String, required: true },
    isClosed: { type: Boolean, default: false }
});

module.exports = mongoose.models.posting || mongoose.model("posting", PostingSchema);