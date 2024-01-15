const mongoose = require('mongoose')
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: false },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    // isAvailable: { type: Boolean, required: true,},
    category: {
        type: {
            _id: { type: ObjectId, required: true, },
            name: { type: String, required: true },
        }, required: false,
    },
});

module.exports = mongoose.model('Product', ProductSchema) || mongoose.models.Product;