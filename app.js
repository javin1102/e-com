require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
//connect to DB

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
connectDB();
app.get("/", (req, res) => res.send("API RUNNING"));

//ROUTES
app.use("/api/register", require("./routes/api/register"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/store", require("./routes/api/store"));
app.use("/api/products", require("./routes/api/products"));

//serve static assets in productions
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is listening on port 5000"));
