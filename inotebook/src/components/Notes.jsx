import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";


const Notes = () => {
    const context = useContext(NoteContext);
    const { myNotes, setMyNotes } = context;
  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {myNotes.map((note) => {
        return (
        <NoteItem key = {note._id} note={note}/>);
      })}
    </div>
  );
}

export default Notes