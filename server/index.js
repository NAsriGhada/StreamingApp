const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const adminRoutes = require("./routes/adminRoutes");


connectDB();


const app = express();
app.use(cors());
const port = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/video", videoRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
