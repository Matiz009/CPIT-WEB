const postModel = require('../model/post');

async function createPost(req, res){
  const newPost = new postModel({
    title:req.body.title,
    description:req.body.description,
    author:req.body.author
  });
  await newPost.save();
  res.status(201).json(
  {
    message: 'Post created successfully',
    post: newPost
  }
);}

async function getPosts(req, res){
    const posts= await postModel.find();
    res.status(200).json(
        {
            message: 'Posts retrieved successfully',
            posts: posts
        }
    );
}

async function getPostById(req,res){
    const postId = req.params.id;
    const post = await postModel.findById(postId);
     res.status(200).json(
        {
            message: 'Post retrieved successfully',
            posts: post
        }
    );
}

async function deletePost(req, res){
  const postId = req.params.id;
  await postModel.findByIdAndDelete(postId);
  res.status(200).json(
    {
      message: 'Post deleted successfully'
    }
  );
}

async function updatePost(req, res){
  const postId = req.params.id;
  const { title, description, author } = req.body;
  await postModel.findByIdAndUpdate(postId, { title, description, author });
  res.status(200).json(
    {
      message: 'Post updated successfully'
    },
    postModel.findById(postId)
  );
}
module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost
}