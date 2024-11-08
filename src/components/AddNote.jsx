import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import PropTypes from "prop-types";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Added successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3 add-note">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description{" "}
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-body"
            onClick={handleOnClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
AddNote.propTypes = {
  showAlert: PropTypes.func,
};


export default AddNote;
