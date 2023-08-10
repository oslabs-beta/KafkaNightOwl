const express = require('express');
const userRouter = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { signupUser, loginUser, getUser } = require('../controllers/userController');
const SessionController = require('../controllers/sessionController');
const CookieController = require('../controllers/cookieController');

userRouter.post("/signup", signupUser, SessionController.startSession, CookieController.setSSID,  (req, res)=>{
  return res.status(200).json(res.locals.user);
});

userRouter.post("/login", loginUser, SessionController.startSession, CookieController.setSSID,  (req, res)=>{
  return res.status(200).json(res.locals.user);
});


userRouter.get("/user", getUser);

module.exports = userRouter;