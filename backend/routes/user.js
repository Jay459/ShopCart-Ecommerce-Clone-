const express = require('express')
const router = express.Router();
const usercontroller = require('../controllers/userControllers');

router.post('/register',usercontroller.userRegister);

router.post('/login',usercontroller.userLogin);

module.exports = router