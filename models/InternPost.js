const mongoose = require("mongoose");

const InternPostSchema = new mongoose.Schema({
    posting: { type: mongoose.Schema.Types.ObjectId, ref: "posting", require: true },
    stipend: { type: String, require: true },
    duration: { type: String, require: true },
});

module.exports = mongoose.model("intern_posts", InternPostSchema);