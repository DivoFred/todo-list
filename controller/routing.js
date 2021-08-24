const express = require("express");
const router = express.Router();
const {
  getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
  deleteAllTodo,
} = require("./creator");

router.route("/").get(getTodo);
router.route("/getTodo").get(getTodo);
router.route("/postTodo").post(postTodo);
router.route("/deleteTodo/:id").delete(deleteTodo);
router.route("/updateTodo/:id").put(updateTodo);
router.route("/deleteAllTodo/").delete(deleteAllTodo);

module.exports = router;
