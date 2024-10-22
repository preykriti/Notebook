import { useState } from "react";
import NoteContext from "./noteContext.jsx";
import PropTypes from "prop-types";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];

  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setMyNotes(json);
  };
  const [myNotes, setMyNotes] = useState(notesInitial);

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = {
      _id: "670b759aaaa373239f7dab069edc",
      user: "6707f73c33e55e0c78dd3354",
      title: title,
      description: description,
      tag: tag,
      date: "2024-10-13T07:24:03.573Z",
      __v: 0,
    };
    setMyNotes(myNotes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json);
    //console.log("deleting id: " + id)
    const newNote = myNotes.filter((note) => {
      return note._id !== id;
    });
    setMyNotes(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json;
    console.log(json);

    //logic to edit in client side
    let newNotes = JSON.parse(JSON.stringify(myNotes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
setMyNotes(newNotes);

    }
  };
  return (
    <NoteContext.Provider
      value={{ myNotes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
NoteState.propTypes = {
  children: PropTypes.node, // children is of type node (can be any renderable content)
};

export default NoteState;
