const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Comment = require('./comment'); // Import the Comment model

const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    blogtitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    blogauthor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    blogcontent: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Blog.hasMany(Comment, { foreignKey: 'blogId' }); // Define the association with Comment model

module.exports = Blog;
