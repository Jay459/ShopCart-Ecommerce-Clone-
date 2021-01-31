const Product = require('./../models/productModel');


//creating new product

exports.newProduct = async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(200).json({ 
        success: true,
        product: product
    })
}


// displaying all the products
exports.getAllProuducts = async (req,res,next) =>{
    const products = await Product.find();
    if(products.length <=0){
        return res.json({
            message:"There are no products"
        })
    }

    res.status(200).json({
        success:"true",
        products: products
    })
}


//get a single product by ID

exports.getSingleProduct = async (req, res, next) =>{

    const product = await Product.findById(req.params.id);
    
    if(!product)
    {
        return next(new Error("Product not found",404));
    }


    res.status(200).json({
        success:"true",
        product: product
    })
}

//updating the products

exports.updateProductById = async (req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new Error("Product not found", 404));
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
}

//deleting a product

exports.deleteProduct = async (req, res, next) => {
    
    let product = await Product.findById(req.params.id)
    if(!product) {
        return next(new Error("Product not found", 404));
    }

    await product.remove();
    res.status(200).json({
        success:"true",
        message:"Product Deleted"
    })
}