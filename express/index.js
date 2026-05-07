const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const api= 'api/v1'
const mongoDB = require('./services/db/connectDb');
const {createPost,getPosts, getPostById, deletePost,updatePost} = require('./controller/post');
const { createUser } = require('./controller/user');

// Enable CORS for all routes
app.use(cors());
//middleware to parse data into json
app.use(express.json());

app.post(`/${api}/create-post`, createPost); 
app.get(`/${api}/get-posts`, getPosts);
app.get(`/${api}/get-post/:id`, getPostById);
app.delete(`/${api}/delete-post/:id`,deletePost);
app.put(`/${api}/update-post/:id`,updatePost);

//end-point for user registration and login
app.post(`/${api}/register`, createUser);

//connect to MongoDB
mongoDB;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});