const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog-content', 'root','nodeintro',
 {dialect :'mysql',host:'localhost'});

 module.exports = sequelize;
