import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white font-bold">Logo</Link>

            <Link
              to="/"
              className="px-3 py-2 text-sm text-white bg-gray-900 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/state"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white"
            >
              State
            </Link>

            <Link
              to="/about"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white"
            >
              About
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar