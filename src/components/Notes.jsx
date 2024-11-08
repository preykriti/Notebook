import { useContext, useRef, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { myNotes, getNotes, editNote } = context;
  const navigate = useNavigate();

  const [filteredNotes, setFilteredNotes] = useState(myNotes);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredNotes(myNotes);
  }, [myNotes]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  const handleOnClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const getUniqueTags = () => {
    const tags = myNotes.map((note) => note.tag);
    return [...new Set(tags)];
  };

  const filterByTag = (tag) => {
    if (tag === "All") {
      setFilteredNotes(myNotes);
    } else {
      setFilteredNotes(myNotes.filter((note) => note.tag === tag));
    }
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/*  Modal for updating notes */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>All Notes</h2>
        <h4>Tags</h4>
        <div className="tag-buttons">
          <button type="button"
            onClick={() => filterByTag("All")}
            className="btn btn-secondary mx-1"
          >
            All
          </button>
          {getUniqueTags().map((tag) => (
            <button
              key={tag}
              onClick={() => filterByTag(tag)}
              className="btn btn-secondary mx-1"
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredNotes.map((note) => (
          <NoteItem
            key={note._id}
            updateNote={updateNote}
            note={note}
            showAlert={props.showAlert}
          />
        ))}
      </div>
    </>
  );
};

Notes.propTypes = {
  showAlert: PropTypes.func,
};

export default Notes;
