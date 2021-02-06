Order = require('../models/order');
Product = require('../models/productModel');

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