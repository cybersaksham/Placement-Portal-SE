const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

module.exports = mongoose.models.admin || mongoose.model("admin", AdminSchema);