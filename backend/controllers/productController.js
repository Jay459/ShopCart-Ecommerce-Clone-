const Product = require('./../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsynErrors = require('../middleware/catchAsyncErrors');
const APIFeatures  =require('../utils/apiFeatures');
const { set } = require('mongoose');
//creating new product

exports.newProduct = catchAsynErrors (async (req,res,next) => {
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(200).json({ 
        success: true,
        product: product
    })
})


// displaying all the products
exports.getAllProuducts = catchAsynErrors (async (req,res,next) =>{
    
    const resPerPage = 8;

    const productsCount = await Product.countDocuments();

    const apiFeatures =  new APIFeatures(Product.find() , req.query)
    .search()
    .filter()
    .pagination(resPerPage)

    const products = await apiFeatures.query;

    setTimeout (() =>{
        res.status(200).json({
        success:"true",
        products: products,
        resPerPage,
        productsCount
        })
    },1000)
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

 exports.createProductReview = catchAsynErrors (async (req, res, next) => {

    const {rating , comment , productId} = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    
    const product = await Product.findById(productId);
    
    const isReviewed = product.reviews.find(
        r => r.user === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment,
                review.rating = rating
            }
        })

    }else{
        product.reviews.push(review);
        product.noOfreviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.reviews.length

    await product.save({validateBeforeSave : false})

    res.status(200).json({
        success:true
    })
})

exports.getProductReviews = catchAsynErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})

exports.deleteReview = catchAsynErrors (async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0)/reviews.length    

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new : true,
        runValidators:true,
        useFindAndModify:false
    })


    res.status(200).json({
        success:true
    })
})