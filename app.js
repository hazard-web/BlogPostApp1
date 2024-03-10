const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const Cors = require('cors');


const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');
// const commentRoutes = require('./routes/comment');
const { JSON } = require('sequelize');
const Blog = require('./models/blog');
// const Comment = require('./models/comment');


const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(bodyParser.json());


// app.use(cors());
app.use(Cors({
    origin: 'http://localhost:8000', // Allow requests from this origin only
    methods: ['GET', 'POST'], // Allow only specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
  }));
app.use(adminRoutes);
// app.use(commentRoutes);


app.get('/blog/add-blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json({ allBlogs: blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});



// app.get('/blog/comment-blogs' , async (req, res, next) => {
//         try {
//             // Retrieve all comments from database
//             const comments = await Comment.findAll();
//             res.status(200).json({ allComments: comments });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ error: error });
//         }
//     });


app.delete('/blog/delete-blog/:id', async (req, res) => {

    try {
        const blogId = req.params.id;
        await Blog.destroy({ where: { id: blogId } });
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500).json(err);
    }
})




sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Runnung On Port ${port}`);
        })
    })
    .catch(err => console.log(err));

