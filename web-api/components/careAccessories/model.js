const mongoose = require('mongoose')
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId

const CareAccessorieSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    origin: { type: String, required: true },
    image: { type: String, required: false },
    size: { type: String, required: true },
});

module.exports = mongoose.model('CareAccessorie', CareAccessorieSchema) || mongoose.models.CareAccessorie;