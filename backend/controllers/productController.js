const Product = require('./../models/productModel');

exports.newProduct = async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(200).json({ 
        success: true,
        product: product
    })
}

exports.getAllProuducts = (req,res,next) =>{
    res.status(200).json({
        success:"true",
        message:"This will show the products in the database."
    })
}