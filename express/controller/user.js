const userModel = require('../model/user');

async function createUser(req, res) {
  try {
    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    console.error(err); // 👈 THIS IS CRITICAL

    res.status(500).json({
      error: err.message // 👈 expose real issue
    });
  }
}

module.exports = {
    createUser
};