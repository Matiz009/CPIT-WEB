import React, { useEffect, useState } from 'react'
import data from './assets/data.json'
import Card from './Card'
import Navbar from './Navbar'
const Home = () => {
  const [posts,setPosts] = useState(null);
  useEffect(()=>{
    fetchPosts();
  },[]);
  async function fetchPosts(){
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  return (
    
    <div>
      <Navbar/>
      {
        posts.map((post) => {
          return (
            <div key={post.id}>
             <Card title={post.title} userId={post.userId} body={post.body}  />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home