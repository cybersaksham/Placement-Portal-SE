const mongoose = require("mongoose");

const InternSchema = new mongoose.Schema({
    posting: { type: mongoose.Schema.Types.ObjectId, ref: "posting", require: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student", require: true },
});

module.exports = mongoose.models.intern || mongoose.model("intern", InternSchema);