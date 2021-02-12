const Product = require('../models/productModel');
require('dotenv').config({path: 'backend/.env'});
const db = require('../database/db');

const products = require('../data/product.json');


const seedProducts = async (req,res,next) => {
    try {
        await Product.deleteMany();
        console.log("deleted products")

        await Product.insertMany(products);
        console.log("successfully added all the products")

    } catch (error) {
        console.log(error.stack);
        process.exit();
    }
}

seedProducts()