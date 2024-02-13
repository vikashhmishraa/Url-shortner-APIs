const express = require("express");

const { handleCreateUser, handleLoginUser } = require("../controllers/user");

const router = express.Router();

router.post("/", handleCreateUser);
router.post("/login", handleLoginUser);

module.exports = router;
