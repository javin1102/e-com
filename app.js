const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json({ extended: false }));
app.use(cors());
//connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/e-com", {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is listening on port 5000"));
