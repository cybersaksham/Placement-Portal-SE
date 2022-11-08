const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    posting: { type: mongoose.Schema.Types.ObjectId, ref: "posting", require: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student", require: true },
    resume: { type: String, require: true }
});

module.exports = mongoose.model("application", ApplicationSchema);