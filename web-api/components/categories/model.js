const mongoose = require('mongoose')
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: { 
        type: String,
        required: true,
    },

    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, required: true, },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            description: { type: String },
            image: { type: String },
        }], required: false,
    }
});

module.exports = mongoose.model('Category', CategorySchema) || mongoose.models.Category;