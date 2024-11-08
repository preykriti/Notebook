import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // user field will store an ObjectId.
    ref: "user", // tells Mongoose that this ObjectId refers to a document in the users collection
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("note", NoteSchema);
//Note variable represents the model that will be used to interact with Mongodb collection corresponding to this model, Note will be used to perform CRUD operations
//"note"is the name of the Mongoose model
export default Note;
