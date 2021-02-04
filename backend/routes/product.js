const express = require('express');
const router = express.Router();
const productcontroller = require('./../controllers/productController');
const auth = require('../middleware/auth')

router.get('/getallproducts' ,auth, productcontroller.getAllProuducts);

router.post('/newproduct', productcontroller.newProduct);

router.get('/singleproduct/:id', productcontroller.getSingleProduct);

router.put('/updateproduct/:id', productcontroller.updateProductById);

router.delete('/deleteproduct/:id', productcontroller.deleteProduct);

module.exports = router;