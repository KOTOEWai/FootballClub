const express = require('express');

const router = express.Router();
const Usercontroller = require('../controllers/User')


router.post('/SignIn',Usercontroller.SignIn);

router.post('/SignUp',Usercontroller.SignUp);


module.exports = router;
