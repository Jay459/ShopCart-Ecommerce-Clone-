const express = require('express');
const router = express.Router();
const productcontroller = require('./../controllers/productController');


router.get('/getallproducts', productcontroller.getAllProuducts);

router.post('/newproduct', productcontroller.newProduct);

module.exports = router;