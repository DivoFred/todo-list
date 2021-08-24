const Todo = require("../models/todo");

exports.getTodo = async (req, res, next) => {
  await Todo.find()
    .sort({ date: -1 })
    .then((e) => res.status(200).json({ success: true, todo: e }))
    .catch((e) => res.status(404).json({ success: false, err: e.message }));
  res.end();
};

exports.postTodo = async (req, res, next) => {
  const { todos } = req.body;
  await Todo.create({
    todos,
  })
    .then((e) => res.status(201).json({ success: true, todo: e }))
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};

exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  await Todo.findById(id)
    .then((e) => e.remove())
    .then(() => res.status(201).json({ success: true, deleting: id }))
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};
exports.deleteAllTodo = async (req, res, next) => {
  await Todo.deleteMany()
    .then(() =>
      res.status(201).json({ success: true, deleting: "All Items Gone" })
    )
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};

exports.updateTodo = async (req, res, next) => {
  const { id } = req.params;
  await Todo.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then(async () => {
      const yowaa = await Todo.findById(id);
      res.status(201).json({ success: true, todo: yowaa });
    })
    .catch((e) => res.status(401).json({ success: false, err: e.message }));
  next();
};
