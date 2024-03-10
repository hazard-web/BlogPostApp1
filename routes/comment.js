const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Route to add a new comment
router.post('/add-comment', commentController.postAddComment);

// Route to get all comments
router.get('/get-all-comments', commentController.getAllComments);

module.exports = router;
