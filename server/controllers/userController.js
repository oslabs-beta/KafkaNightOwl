const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const signupUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: hashedPassword,
  };
  await User.create(user)
    .then((data)=>{
      res.locals.user = data.id;
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.createUser ERROR: ${err}`,
        status: 500,
        message: {
          err: 'Error in userController.createUser. See log.',
        },
      });
    });


    // ----- old -----
  // if (!email || !password) {
  //   res.status(400);
  //   throw new Error('Missing field');
  // }

  // const hashedPassword = await bcrypt.hash(password, 10);
  // const user = await User.create({
  //   email,
  //   password: hashedPassword,
  // });
  
  // if (user) {
  //   res.status(201).json({ _id: user.id, email: user.email });
  // } else {
  //   res.status(400);
  //   throw new Error('User not valid');
  // }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      log: 'userController.verifyUser ERROR: missing input fields',
      status: 401,
      message: {
        error: 'Missing fields, try again.', // generic message to user
      },
    });
  }
  User.findOne({ email })
    .then((user)=>{
      if (user && (bcrypt.compare(password, user.password))) {
        res.locals.user = user.id;
        return next();
      }
  })
  //compare password with hashed password
  .catch((err)=>{
    return next({
      log: 'userController.verifyUser ERROR: user not found',
      status: 401,
      message: {
        error:
          'Invalid credentials, user not found. ',// to user
      },
    });
  })
  
});

const getUser = asyncHandler(async (req, res) => {
 res.json(req.user);
});

module.exports = { signupUser, loginUser, getUser };

/*
const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    );
    res.status(200).json({ accessToken });
*/