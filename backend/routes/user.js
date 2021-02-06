const express = require('express')
const router = express.Router();
const usercontroller = require('../controllers/userControllers');
const auth = require('../middleware/auth');

router.post('/register',usercontroller.userRegister);

router.post('/login',usercontroller.userLogin);

router.get('/logout',usercontroller.logout);

router.put('/password/forgot', usercontroller.forgotPassword);

router.put('/password/reset/:token',usercontroller.resetPassword);

router.get('/me', auth.isAuthenticatedUser , usercontroller.getUserProfile)

router.put('/changepassword', auth.isAuthenticatedUser , usercontroller.changePassword)

router.put('/updateprofile', auth.isAuthenticatedUser , usercontroller.updateUserProfile)

router.get('/admin/getallusers', auth.isAuthenticatedUser , auth.authRoles('admin') , usercontroller.getAllUsers);

router.get('/admin/getuser/:id', auth.isAuthenticatedUser , auth.authRoles('admin') , usercontroller.getUserById);

router.put('/admin/updateuser/:id', auth.isAuthenticatedUser , auth.authRoles('admin') , usercontroller.updateUserProfileById);

router.delete('/admin/deleteuser/:id', auth.isAuthenticatedUser , auth.authRoles('admin') , usercontroller.deleteUserById);

module.exports = router