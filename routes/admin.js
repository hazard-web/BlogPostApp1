
const express = require('express');
const adminController = require('../controllers/blog');

const router = express.Router();

router.get('/',adminController.getBlogPage);

router.post('/AddBlog', adminController.postAddBlog);
// router.get('/addSuccess', adminController.getAddSuccess);

router.get('/blogs', adminController.getBlogs);
   


module.exports = router;