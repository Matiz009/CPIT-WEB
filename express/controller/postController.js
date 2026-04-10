function getPosts(req, res){
  res.json(posts);
}

function getSpecificPost(req, res){
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
}

function deleteSpecificPost(req, res){
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
}

function updateSpecificPost(req, res){
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
}

function createPost(req, res){
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
}
module.exports = {
  getPosts,
  getSpecificPost,
  deleteSpecificPost,
  updateSpecificPost,
  createPost
}