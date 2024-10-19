import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchuser.js";
const JWT_SECRET = "helloworld!";

//! ROUTE 1: create a user using : POST "api/auth/createuser". no login
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
    //console.log("Route hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }

    //check if the email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success:false, error: "This email already existss" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //response to user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //res.json(user);
      res.json({success:true, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success:false, error:"some error occured"});
    }

    //.then((user) => res.json(user))
    // .catch((err) => {
    // console.log(err);
    // res.json({ error: "please enter a unique value for email" });
    // });
  }
);

//! ROUTE 2: authenticate a user using : POST "api/auth/login". no login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, error: errors.array });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success:false, error: "Please enter correct credentials" });
      }
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res
          .status(400)
          .json({success:false, error: "Please enter correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success:true, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success:false, error: "Internal Server Error" });
    }
  }
);

// ! ROUTE 3: Get logged in user details using: POST "/api/auth/getUser". login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({success:true,user});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success:false, error: "Internal Server Error" });
  }
});

export default router;
