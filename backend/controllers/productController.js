const Product = require('./../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsynErrors = require('../middleware/catchAsyncErrors');
const APIFeatures  =require('../utils/apiFeatures');
//creating new product

exports.newProduct = catchAsynErrors (async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(200).json({ 
        success: true,
        product: product
    })
})


// displaying all the products
exports.getAllProuducts = catchAsynErrors (async (req,res,next) =>{
    
    const resPerPage = 1;

    const productCount = await Product.countDocuments();

    const apiFeatures =  new APIFeatures(Product.find() , req.query)
    .search()
    .filter()
    .pagination(resPerPage)

    const products = await apiFeatures.query;

    if(products.length <=0){
        return res.json({
            message:"There are no products"
        })
    }

    res.status(200).json({
        success:"true",
        products: products,
        productCount
    })
})


//get a single product by ID

exports.getSingleProduct = catchAsynErrors (async (req, res, next) =>{

    const product = await Product.findById(req.params.id)
    
    if(!product)
    {
        return next(new ErrorHandler("Product not found", 404));
    }


    res.status(200).json({
        success:"true",
        product: product
    })
})

//updating the products

exports.updateProductById = catchAsynErrors (async (req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }


    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new : true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:"true",
        updatedProduct:product
    })
})

//deleting a product

exports.deleteProduct = catchAsynErrors (async (req, res, next) => {
    
    let product = await Product.findById(req.params.id)
    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();
    res.status(200).json({
        success:"true",
        message:"Product Deleted"
    })
})