const {
  registerUser,
  findUserByEmail,
  comparePassword,
} = require("../services/authService");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const User = require("../models/User");

// Register Controller
const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    // const accessToken = generateAccessToken(user._id);
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user._id);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      message: "Login successful",

      accessToken,

      refreshToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        ).select("-password");


        res.json({
            success: true,
            user
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
  register,
  login,
  getMe
};
