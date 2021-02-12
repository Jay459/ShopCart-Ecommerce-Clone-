const mongoose = require('mongoose');
const User = require('../models/userModel');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:[32 , "Please Enter Product Name"]
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxLength:[5 , "Please Enter Product Price"]
    },
    description:{
        type:String,
        required:[true, "Please Enter Product Description"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:Array,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, "PLease select category for this Product"],
        enum:{
            values:[
                "Mobiles","Laptops","Electronics","Food","Books","Clothes/Shoes","Beauty/Health","Sports","Outdoor","Home"
            ],
            message:"Please select a correct category for this Product"
        }
    },
    seller:{
        type:String,
        required:[true, "PLease Enter seller for this Product"]

    },
    stock:{
        type:Number,
        required:[true, "PLease Enter stock for this Product"],
        maxLength:[5, "stock value should not exceed 5 characters"],
        default:0
    },
    noofreviews:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
               //required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        // required:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;