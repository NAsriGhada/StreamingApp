const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .set("strictQuery", true)
    .connect(process.env.MONGO_DB_CONNECTION)
    .then(() => console.log("db is connected..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
