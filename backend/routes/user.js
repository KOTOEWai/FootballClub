const express = require('express');

const router = express.Router();
const Usercontroller = require('../controllers/User')
const upload = require('../helper/upload')
const AuthMiddleware = require('../middleware/auth')
const uploadFields = upload.fields([
    { name: 'profile_img', maxCount: 2}
])

const isAdmin = (req,res,next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "User is not admin" });
    }
    next();
}

router.post('/SignIn',Usercontroller.SignIn);

router.post('/SignUp',uploadFields,Usercontroller.SignUp);

router.post('/Loggout',Usercontroller.Loggout);

router.get('/:id',Usercontroller.getuser);

router.get('/secure/auth',AuthMiddleware,Usercontroller.me);

router.get('/secure/admin',AuthMiddleware,isAdmin,Usercontroller.admin);

router.get('/get/all',Usercontroller.getall);
router.delete('/delete/:id',Usercontroller.delete);

module.exports = router;
