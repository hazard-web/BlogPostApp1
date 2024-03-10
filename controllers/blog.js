const Blog = require('../models/blog');
const path = require('path');
const express = require('express');
const { JSON } = require('sequelize');




exports.getBlogPage = (req,res,next) => {
    res.sendFile(path.join(__dirname,'..','public', 'views','CreateBlogPage.html'));
     
}

exports.getBlogs = (req, res, next) => {
   
   


   
}


exports.postAddBlog = (req,res,next) => {
     
    let blog = {
        blogtitle: req.body.blogtitle,
        blogauthor: req.body.blogauthor,
        blogcontent:req.body.blogcontent
    }

    Blog.create({
        blogtitle: blog.blogtitle,
        blogauthor: blog.blogauthor,
        blogcontent: blog.blogcontent

    })
    .then( result => {
        console.log('Created..',result);
       res.redirect('/');
    })
    .catch( err => {
        // res.send("You already sumbit this expense.");
        res.sendStatus(500).json(err)
        console.log(err);
    });

   
}
