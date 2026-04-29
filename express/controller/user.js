const UserModel = require('../model/user');

async function createUser(req, res) {
  try {
    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
        // ✅ No password sent
      }
    });

  } catch (err) {
    console.error(err);

    // Handle specific errors
    if (err.code === 11000) { // Duplicate key
      return res.status(400).json({
        error: "Username or email already exists"
      });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: "Invalid input data"
      });
    }

    // Generic error for production
    res.status(500).json({
      error: "Registration failed"
    });
  }
}

module.exports = { createUser };