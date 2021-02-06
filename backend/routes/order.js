const express = require('express');
const router = express.Router();

const orderControllers = require('../controllers/orderController');
const {isAuthenticatedUser, authRoles} = require('../middleware/auth');

router.post('/neworder',isAuthenticatedUser , orderControllers.createOrder);

router.get('/getorder/:id',isAuthenticatedUser, orderControllers.getOrdersById);

router.get('/myorders',isAuthenticatedUser, orderControllers.myOrders)

router.get('/allorders',isAuthenticatedUser, authRoles('admin'), orderControllers.allorders)

module.exports = router;