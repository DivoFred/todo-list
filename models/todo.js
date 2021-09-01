const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
  todos: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [Todo],
});
module.exports = mongoose.model("user", User);
