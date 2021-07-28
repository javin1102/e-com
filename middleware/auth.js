require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  //Get token from headers
  const token = req.header("x-auth-token");
  //Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Access denied, no authorization token" });
  }
  //If got token, verify token
  try {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) return res.status(401).json({ msg: "Access denied" });
      req.userId = decodedToken.userId;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
