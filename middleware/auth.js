require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token authorization denied" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
module.exports = auth;
