import express from "express";
const router = express.Router();
import fetchUser from "../middleware/fetchuser.js";
import Note from "../models/Notes.js";
import { body, validationResult } from "express-validator";

//! ROUTE 1: fetch all notes using: GET "api/note/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//! ROUTE 2: Add a new note using: POST "api/note/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ! ROUTE 3: Update an existing note using: POST "api/note/updatenote". Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create newNote obj
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Note Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      //to ensure value is in string format, sometimes the user ID in the database is stored as an ObjectId, which is not a string type
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    //The { new: true } option tells Mongoose to return the updated document after the update is applied, rather than the original document before the update. If you omit this option, Mongoose will return the original document by default.
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ! ROUTE 4: Delete an existing note using: delete "api/note/deletenote". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //const {title, description, tag} = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
