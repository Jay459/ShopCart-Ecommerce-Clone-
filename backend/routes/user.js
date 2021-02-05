const express = require('express')
const router = express.Router();
const usercontroller = require('../controllers/userControllers');

router.post('/register',usercontroller.userRegister);

router.post('/login',usercontroller.userLogin);

router.get('/logout',usercontroller.logout);

router.put('/password/forgot', usercontroller.forgotPassword);

router.put('/password/reset/:token',usercontroller.resetPassword);

module.exports = router