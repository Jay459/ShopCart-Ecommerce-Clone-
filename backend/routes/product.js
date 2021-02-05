const express = require('express');
const router = express.Router();
const productcontroller = require('./../controllers/productController');
const {isAuthenticatedUser, authRoles} = require('../middleware/auth')

router.get('/getallproducts' ,isAuthenticatedUser , authRoles('admin') , productcontroller.getAllProuducts);

router.post('/newproduct', isAuthenticatedUser, authRoles('admin') , productcontroller.newProduct);

router.get('/singleproduct/:id', productcontroller.getSingleProduct);

router.put('/updateproduct/:id', isAuthenticatedUser, authRoles('admin') , productcontroller.updateProductById);

router.delete('/deleteproduct/:id',isAuthenticatedUser,authRoles('admin') , productcontroller.deleteProduct);

module.exports = router;