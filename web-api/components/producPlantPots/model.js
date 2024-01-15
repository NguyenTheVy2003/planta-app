const mongoose = require('mongoose')
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId

const PlantPostSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    origin: { type: String, required: true },
    image: { type: String, required: false },
    status: { type: String, required: true },
});

module.exports = mongoose.model('PlantPost', PlantPostSchema) || mongoose.models.PlantPost;