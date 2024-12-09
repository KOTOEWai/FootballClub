const express = require('express');
const router = express.Router();

const Matchcontroller = require('../controllers/product');
const upload = require('../helper/upload')



const uploadFields = upload.fields([
    { name: 'img', maxCount: 2 }
]);
// Routes
router.post('/createProduct',uploadFields,Matchcontroller.createProduct);
router.get('/', Matchcontroller.getAllProducts);
router.get('/:id', Matchcontroller.getProductById);
router.put('/:id',uploadFields,Matchcontroller.updateProduct);
router.delete('/:id', Matchcontroller.deleteProduct);

module.exports = router;
