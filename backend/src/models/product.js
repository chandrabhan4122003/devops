const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        default: "product's image",
    },
    rating:{
        type: Number,
        default: 0,
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Unisex'], 
        required: true 
    }
});
module.exports = mongoose.model("Product", productSchema);