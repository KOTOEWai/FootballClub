const express = require('express');

const router = express.Router();
const blogcontroller = require('../controllers/Blog')

router.get('/', blogcontroller.getBlogs);
router.get('/:id',blogcontroller.getSingleBlog);
router.post('/',blogcontroller.createBlog);
router.put('/:id',blogcontroller.updateBlog);
router.delete('/:id',blogcontroller.deleteBlog);

module.exports = router;
