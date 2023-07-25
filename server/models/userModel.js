const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Add username"],
  }, 
  email: {
    type: String,
    required: [true, "Add email"],
    unique: [true, "Email already taken"],
  },
  password: {
    type: String,
    required: [true, "Add password"],
  },
  server:{
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);