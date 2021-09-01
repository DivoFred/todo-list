const User = require("../models/todo");
const bcryptjs = require("bcryptjs");

exports.isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status("500").json({ success: false, message: "not logged in" });
  }
};

exports.postUser = async (req, res, next) => {
  const { user, password } = req.body;
  let userCheck = await User.findOne({ user });
  if (userCheck) {
    res.status("400").json({ success: false, message: "User Already exist" });
  } else {
    const hashPass = await bcryptjs.hash(password, 12);
    await User.create({
      user,
      password: hashPass,
    })
      .then((e) => res.status(201).json({ success: true, user: e }))
      .catch((e) => {
        res.status(401).json({ success: false, err: e });
      });
  }
};
exports.loginUser = async (req, res, next) => {
  const { user, password } = req.body;
  if (!user || !password) {
    res
      .status("400")
      .json({ success: false, message: "user or passsword not present" });
  } else {
    const userCheck = await User.findOne({ user });
    if (!userCheck) {
      res.status("400").json({ success: false, message: "User not found" });
    } else {
      // Check for the comparison btw the password provided and the password transformed by bcrypt
      const isMatch = await bcryptjs.compare(password, userCheck.password);
      if (isMatch) {
        req.session.isAuth = true;
        res.status("200").json({ success: true, user: userCheck });
      } else {
        res
          .status("400")
          .json({ success: false, message: "Password Doesn't Match" });
      }
      next();
    }
  }
};
exports.logoutUser = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ success: false, message: err });
    } else {
      res.status("200").json({ success: true, message: "session ended" });
    }
  });
};
exports.getUser = async (req, res, next) => {
  await User.find({}).then((e) => {
    res.status(200).json({ success: true, user: e });
  });
};

exports.getTodo = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((e) => res.status(200).json({ success: true, todo: e.todos }))
    .catch((e) => res.status(404).json({ success: false, err: e.message }));
  res.end();
};
exports.postTodo = async (req, res, next) => {
  const { todos, id } = req.body;

  await User.findById(id)
    .then((e) => {
      e.todos.push({ todos });
      e.save((err, data) => {
        if (err) console.log("error", err);
      });
      res.status(201).json({ success: true, todo: e.todos });
    })
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};

exports.deleteTodo = async (req, res, next) => {
  const { id } = req.body;
  const { idTodo } = req.params;
  await User.findById(id)
    .then((e) => {
      e.todos.id(idTodo).remove();
      e.save((err, data) => {
        if (err) console.log("this is an error", err);
      });
      res.status(201).json({ success: true, deleting: idTodo });
    })
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};
exports.deleteAllUser = async (req, res, next) => {
  await User.deleteMany()
    .then(() =>
      res.status(201).json({ success: true, deleting: "All Items Gone" })
    )
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};

exports.deleteAllTodo = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((e) => {
      let hola = e.todos;
      hola.set([]);
      e.save((err, data) => {
        if (err) console.log("this is an error", err);
      });
      res.status(201).json({ success: true, deleting: "All Shit GONE", hola });
    })
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};

exports.updateTodo = async (req, res, next) => {
  const { id } = req.body;
  const { idTodo } = req.params;
  await User.findById(id)
    .then(async (e) => {
      const hola = e.todos.id(idTodo);
      hola.todos = req.body.todos;
      e.save((err, data) => {
        if (err) console.log("error", err);
      });
      res.status(201).json({ success: true, todo: hola });
    })
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};
