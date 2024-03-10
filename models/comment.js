const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Blog = require('./blog'); // Import the Blog model

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    blogId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    blogauthor: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Comment.belongsTo(Blog, { foreignKey: 'blogId' }); // Define the association with Blog model

module.exports = Comment;
