const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const express = require('express');
import 'dotenv/config'

const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password) {
    res.status(400);
    throw new Error("Missing field");
  }
  const userAvaialable = await User.findOne(email);
  if(userAvaialable) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if(user) {
    res.status(201).json({_id: user.id, email: user.email});
  } else {
    res.status(400);
    throw new Error("User not valid");
  }
});

const loginUser = asyncHandler (async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    res.status(400);
    throw new Error("Missing field");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password
  if(user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m"}
   );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const getUser = asyncHandler (async (req, res) => {
  res.json(req.user);
});

module.exports = { signupUser, loginUser, getUser }