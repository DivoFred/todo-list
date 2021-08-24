const mongoose = require("mongoose");
const localDB = `mongodb://localhost:27017/todo`;

const connectDB = async () => {
  await mongoose
    .connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log("MongoDB QUANECTTED"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
