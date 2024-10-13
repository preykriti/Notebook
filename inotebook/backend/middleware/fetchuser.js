import jwt from "jsonwebtoken";
const JWT_SECRET = "helloworld!";

const fetchUser = (req, res, next) => {
  // get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
