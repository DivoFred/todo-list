const express = require("express");
const app = express();
const path = require("path");
const router = require("./controller/routing");

app.use(express.json());
app.use("/", router);
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || "5000";

const connectDB = require("./db/config");

connectDB();
app.listen(PORT, console.log(`server starting at PORT ${PORT}`));
