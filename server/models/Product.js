const mongoose = require('mongoose');
const { User } = require('../models/User');

const productSchema = mongoose.Schema({
    writer : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : User
    },
    title : {
        type : String,
        maxlength : 50,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        default : 0,
        required : true
    },
    images : {
        type : Array,
        default : [],
        required : true
    },
    continents : {
        type : Number,
        required : true
    },
    sold : {
        type : Number,
        maxlength : 100,
        default : 0,
    },
    views : {
        type : Number,
        default : 0
    }
}, { timestamps : true })

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };