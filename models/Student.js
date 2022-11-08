const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    degree: { type: String, require: true },
    branch: { type: String, require: true },
    addmissionYear: { type: Number, require: true },
    dob: { type: Date, require: true },
    skills: { type: [String] },
    cgpa: { type: Number, require: true },
    isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.models.student || mongoose.model("student", StudentSchema);