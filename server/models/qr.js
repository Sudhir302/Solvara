const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    qrLink: {
        type: String,
        required: true
    }
})

const qrLink = new mongoose.model("QrLink", qrSchema);

module.exports = qrLink;