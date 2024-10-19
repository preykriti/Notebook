import PropTypes from "prop-types";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const { note, updateNote} = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      {/* {note.title}
    {note.description} */}
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash mx-3"
            onClick={() => {
              return deleteNote(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen mx-3"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  updateNote: PropTypes.func,
};
export default NoteItem;
