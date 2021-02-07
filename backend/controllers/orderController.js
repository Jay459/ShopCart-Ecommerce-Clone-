const Order = require('../models/order');
const Product = require('../models/productModel');

const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.createOrder = catchAsyncErrors (async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(), 
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
})

exports.getOrdersById = catchAsyncErrors (async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('User','name email');

    if(!order){
        return next(new ErrorHandler("No Order Found",400))
    }

    res.status(200).json({
        success: true,
        order
    })
})

exports.myOrders = catchAsyncErrors (async (req, res, next) => {
    const orders = await Order.find({user : req.user._id})

    res.status(200).json({
        success: true,
        orders
    })
})

exports.allorders = catchAsyncErrors (async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
    
})

exports.updateOrder = catchAsyncErrors (async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === 'delivered'){
        return next(new ErrorHandler('you have already delivered this product',400));
    }

    order.orderItems.forEach(async item =>{
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save()

    res.status(200).json({
        success:true
    })
})

async function updateStock(id,quantity) {
    const product = await Order.findById(id);

    product.stock = product.stock - quantity

    await product.save({validateBeforeSave:false})
}


exports.deleteOrderById = catchAsyncErrors (async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No Order found with this id",400));
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})