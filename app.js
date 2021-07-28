const express = require("express");
const mongoose = require("mongoose");
const app = express();

//connect to DB
mongoose.connect("mongodb://localhost:27017/e-com", { useNewUrlParser: true });

app.get("/", (req, res) => res.send("API RUNNING"));

//ROUTES
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is listening on port 5000"));
