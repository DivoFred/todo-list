const express = require("express");
const app = express();
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);
const path = require("path");
const router = require("./controller/routing");
const {
  isAuth,
  loginUser,
  getTodo,
  logoutUser,
  postTodo,
  deleteTodo,
  updateTodo,
} = require("./controller/creator");

app.use(express.json());
app.use("/", router);
const store = new MongodbSession({
  uri: "mongodb://localhost:27017/todo",
  collection: "mySession",
});
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "a secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
const PORT = process.env.PORT || "5000";

const connectDB = require("./db/config");
/// All Todos Function plus login and log out
app.post("/getTodo", isAuth, getTodo);
app.post("/loginUser", loginUser);
app.post("/postTodo", isAuth, postTodo);
app.delete("/deleteTodo/:idTodo", isAuth, deleteTodo);
app.put("updateTodo/:idTodo", isAuth, updateTodo);
app.post("/logoutUser", logoutUser);

connectDB();
app.listen(PORT, console.log(`server starting at PORT ${PORT}`));
