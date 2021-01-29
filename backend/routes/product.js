const express = require('express');
const router = express.Router();
const productcontroller = require('./../controllers/productController');


router.get('/getallproducts', productcontroller.getAllProuducts);

module.exports = router;