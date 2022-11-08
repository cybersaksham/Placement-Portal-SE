const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    type: { type: String },
    headOffice: { type: String },
    isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.models.company || mongoose.model("company", CompanySchema);