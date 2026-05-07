import React from 'react'

const Card = ({
  id,
  title,
  description,
  image,
  onDelete,
  onEdit
}) => {

  async function deletePost() {

    try {

      await fetch(
        `http://localhost:3000/api/v1/delete-post/${id}`,
        {
          method: 'DELETE'
        }
      );

      onDelete(id);

    } catch (error) {
      console.error(error);
    }
  }

  return (

    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">

      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="py-4">

        <h2 className="font-bold text-xl mb-2">
          {title}
        </h2>

        <p className="text-gray-700">
          {description}
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={() =>
            onEdit({
              _id: id,
              title,
              description
            })
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={deletePost}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default Card