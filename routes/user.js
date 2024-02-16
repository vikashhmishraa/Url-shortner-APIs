const express = require("express");

const {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleCreateUser);
router.post("/login", handleLoginUser);
router.get("/logout", handleLogoutUser);

module.exports = router;
