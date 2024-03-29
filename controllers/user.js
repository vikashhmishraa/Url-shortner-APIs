const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const { setUser } = require("../service/auth");

async function handleCreateUser(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  // const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
  // return res.json({ token });
}

async function handleLogoutUser(req, res) {
  // Invalidate JWT token on the server-side (this step depends on your authentication mechanism)

  // Set the cookie to expire by setting its expiration date to a past date
  res.cookie("token", "", { expires: new Date(0) });

  // Redirect the user to the login page or any other appropriate page
  res.redirect("/login");
}

module.exports = {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
};
