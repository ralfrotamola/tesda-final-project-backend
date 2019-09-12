const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

// Create Product Schema
const SchemaTypes = mongoose.Schema.Types;
const ProductSchema = new Schema({
    img_path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    qty: {
        type: SchemaTypes.Double,
        required: true
    },
    price: {
        type: SchemaTypes.Double,
        required: true
    },        
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    }
})

module.exports = Product = mongoose.model('products', ProductSchema);