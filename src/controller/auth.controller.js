const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio } = req.body;

  const isexistsuser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isexistsuser) {
    return res.status(400).json({
      message: "Username or email already exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const isPasswordValid = hash === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
