import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
//import User from "../models/User";

router.post(
  "/",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    console.log("Route hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    }).then((user) => res.json(user)).catch(err=>{console.log(err)
        res.json({error: "please enter a unique value for email"})
    });
    
  }
);

export default router;
