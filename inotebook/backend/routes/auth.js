import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
//import User from "../models/User";

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //If there are errors, return bad request and errors
    console.log("Route hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check if the email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "This email already existss" });
      }
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json({ successful: "yes" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }

    //.then((user) => res.json(user))
    // .catch((err) => {
    // console.log(err);
    // res.json({ error: "please enter a unique value for email" });
    // });
  }
);

export default router;
