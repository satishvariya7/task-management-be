const jwt = require("jsonwebtoken");

const jwtVerification = (req, res, next) => {
  const headers = req.headers.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRETE_KEY, (err) => {
        if (err) {
          next({ message: "Token not valid!" });
        } else next();
      });
    } else res.send({ unauthorize: true, message: "Token not valid!" });
  } else
    res.send({
      unauthorize: true,
      message: "Can not get access without send token!",
    });
};

module.exports = jwtVerification;
