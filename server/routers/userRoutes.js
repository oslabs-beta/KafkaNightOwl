const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { signupUser, loginUser, getUser } = require('../controllers/userController');


router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/user", validateToken, getUser);

module.exports = userRouter;