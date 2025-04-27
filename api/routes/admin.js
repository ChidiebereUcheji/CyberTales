const express = require("express");
const router = express.Router();

const { createUser, login, logout } = require("../controllers/admin");

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;