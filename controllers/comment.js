const Comment = require('../models/comment');
const path = require('path');
const express = require('express');
const { JSON } = require('sequelize');

exports.postAddComment = async (req, res, next) => {
    const { blogId, text, blogauthor } = req.body;

    try {
        const comment = await Comment.create({ blogId, text, blogauthor });
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        
        // You can log additional details about the request for debugging purposes
        console.error('Request body:', req.body);
        console.error('Request params:', req.params);

        res.status(500).json({ error: 'Error creating comment' });
    }
};

exports.getAllComments = async (req, res, next) => {
    try {
        // Retrieve all comments from the database
        const comments = await Comment.findAll();
        res.status(200).json({ allComments: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching commentss' });
    }
};
