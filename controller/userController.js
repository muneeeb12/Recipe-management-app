const User = require("../model/userModel");

const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);

    // Ensure the user is updating their own account
    if (req.body.id !== String(user._id)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this account",
      });
    }

    // Only allow updates to the username, answer, and password fields
    const { username, answer, password } = req.body;

    if (username) user.username = username;
    if (answer) user.answer = answer;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        username: user.username,
        answer: user.answer,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    // Ensure the user is deleting their own account
    if (req.body.id !== String(user._id)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this account",
      });
    }

    await User.findByIdAndDelete(req.body.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  deleteUserController,
};
