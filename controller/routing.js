const express = require("express");
const router = express.Router();
const {
  postUser,
  // getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
  deleteAllUser,
  // loginUser,
  getUser,
} = require("./creator");

router.route("/").get(getUser);
// router.route("/getTodo").post(getTodo);
// router.route("/postTodo").post(postTodo);
router.route("/postUser").post(postUser);
// router.route("/loginUser").post(loginUser);
// router.route("/deleteTodo/:idTodo").delete(deleteTodo);
// router.route("/updateTodo/:idTodo").put(updateTodo);
router.route("/deleteAllUser/").delete(deleteAllUser);
// router.route("/deleteAllTodo/").delete(deleteAllTodo);

module.exports = router;
