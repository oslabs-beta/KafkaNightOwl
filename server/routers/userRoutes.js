const express = require('express');
const userRouter = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { signupUser, loginUser, getUser } = require('../controllers/userController');


userRouter.post("/signup", signupUser);

userRouter.post("/login", loginUser);

userRouter.get("/user", validateToken, getUser);

module.exports = userRouter;