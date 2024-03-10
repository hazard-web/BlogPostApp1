
const express = require('express');
const adminController = require('../controllers/blog');
const commentController = require('../controllers/comment');

const router = express.Router();

router.get('/',adminController.getBlogPage);

router.post('/AddBlog', adminController.postAddBlog);
// router.get('/addSuccess', adminController.getAddSuccess);

router.get('/blogs', adminController.getBlogs);

// Route to add a new comment
router.post('/add-comment', commentController.postAddComment);

// Route to get all comments
router.get('/get-all-comments', commentController.getAllComments);
   


module.exports = router;