const expressJWT = require("express-jwt");

exports.requireSignin = expressJWT({
  secret: `${process.env.JWT_SECRET}`,
  algorithms: ["HS256"],
});
