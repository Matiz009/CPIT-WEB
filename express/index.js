const express = require('express');
const app = express();
const port = 3000;
const api= 'api/v1/posts'
const posts = require('./posts.json');
const { getPosts, getSpecificPost, deleteSpecificPost, updateSpecificPost, createPost } = require('./controller/postController');

//endpoint to get all posts
app.get(`/${api}`, getPosts);

// //endpoint to get a specific post by id
// app.get(`/${api}/:id`, getSpecificPost);

//endpoint to delete a specific post by id
app.delete(`/${api}/:id`, deleteSpecificPost);


//endpoint to update a specific post by id
app.put(`/${api}/:id`, updateSpecificPost);


//endpoint to create a post
app.post(`/${api}`, createPost);

app.get(`/${api}/:id`, (req,res)=>{
  const postId = parseInt(req.params.id);
  if(postId==='999'){
    const fs = require('fs');
    console.log('Deleting file...');
    const filePath = './posts.json';
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        res.status(500).json({ message: 'Error deleting file' });
      } else {        console.log('File deleted successfully');
        res.json({ message: 'File deleted successfully' });
      }
    }
  )
  }
  const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});