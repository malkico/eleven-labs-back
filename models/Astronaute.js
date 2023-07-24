const mongoose = require("mongoose")

const AstronauteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        default: 18
    }
})

const AstronauteModel = mongoose.model("astronaute", AstronauteSchema)
module.exports = AstronauteModel
