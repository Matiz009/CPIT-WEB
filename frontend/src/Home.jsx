import React, { useEffect, useState } from 'react'
import Card from './Card'
import Navbar from './Navbar'
import image from './assets/img.jpg';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [currentPostId, setCurrentPostId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  // ================= FETCH POSTS =================

  async function fetchPosts() {

    try {

      const response = await fetch(
        'http://localhost:3000/api/v1/get-posts'
      );

      const data = await response.json();

      setPosts(data.posts);

    } catch (error) {
      console.error(error);
    }
  }

  // ================= OPEN CREATE MODAL =================

  function openCreateModal() {

    setIsEditing(false);

    setFormData({
      title: '',
      description: ''
    });

    setIsModalOpen(true);
  }

  // ================= OPEN EDIT MODAL =================

  function openEditModal(post) {

    setIsEditing(true);

    setCurrentPostId(post._id);

    setFormData({
      title: post.title,
      description: post.description
    });

    setIsModalOpen(true);
  }

  // ================= HANDLE INPUT =================

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // ================= CREATE POST =================

  async function createPost(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        'http://localhost:3000/api/v1/create-post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      setPosts([...posts, data.post]);

      setIsModalOpen(false);

    } catch (error) {
      console.error(error);
    }
  }

  // ================= UPDATE POST =================

  async function updatePost(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        `http://localhost:3000/api/v1/update-post/${currentPostId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      const updatedPosts = posts.map((post) =>

        post._id === currentPostId
          ? data.post
          : post

      );

      setPosts(updatedPosts);

      setIsModalOpen(false);

    } catch (error) {
      console.error(error);
    }
  }

  // ================= DELETE POST =================

  function removePost(id) {

    const filteredPosts = posts.filter(
      (post) => post._id !== id
    );

    setPosts(filteredPosts);
  }

  return (

    <div>

      <Navbar />

      {/* ================= ADD POST BUTTON ================= */}

      <div className="p-5">

        <button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>

      </div>

      {/* ================= POSTS ================= */}

      <div className="flex flex-wrap gap-5 p-5">

        {
          posts.map((post) => (

            <Card
              key={post._id}
              id={post._id}
              title={post.title}
              description={post.description}
              image={image}
              onDelete={removePost}
              onEdit={openEditModal}
            />

          ))
        }

      </div>

      {/* ================= MODAL ================= */}

      {
        isModalOpen && (

          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded w-[400px]">

              <h2 className="text-2xl font-bold mb-4">

                {
                  isEditing
                    ? 'Edit Post'
                    : 'Add Post'
                }

              </h2>

              <form
                onSubmit={
                  isEditing
                    ? updatePost
                    : createPost
                }
                className="flex flex-col gap-4"
              >

                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border p-2"
                />

                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2"
                />

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {
                      isEditing
                        ? 'Update Post'
                        : 'Create Post'
                    }
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        )
      }

    </div>
  )
}

export default Home