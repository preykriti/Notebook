import { useState } from "react";
import NoteContext from "./noteContext.jsx";
import PropTypes from "prop-types";

const NoteState = (props) => {
  const host ="http://localhost:8000";
  const notesInitial = [];

// get all notes
  const getNotes = async()=>{
    const response = await fetch(
      `${host}/api/note/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwN2Y3M2MzM2U1NWUwYzc4ZGQzMzU0In0sImlhdCI6MTcyODc1MTc3NX0.Jyg_HH3z-4Eyap8A7PIyG9tq58gMmJREvk5Tqx-OSLs"
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setMyNotes(json);
  } 
  const [myNotes, setMyNotes] = useState(notesInitial);

  //add a note
  const addNote = async(title, description, tag)=>{
    const response = await fetch(
      `${host}/api/note/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwN2Y3M2MzM2U1NWUwYzc4ZGQzMzU0In0sImlhdCI6MTcyODc1MTc3NX0.Jyg_HH3z-4Eyap8A7PIyG9tq58gMmJREvk5Tqx-OSLs"
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
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
  } 

  //delete a note
const deleteNote = async (id) => {
  const response = await fetch(
      `${host}/api/note/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "ey JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwN2Y3M2MzM2U1NWUwYzc4ZGQzMzU0In0sImlhdCI6MTcyODc1MTc3NX0.Jyg_HH3z-4Eyap8A7PIyG9tq58gMmJREvk5Tqx-OSLs"
        },
      }
    );
    const json = response.json();
    console.log(json);
  //console.log("deleting id: " + id)
  const newNote = myNotes.filter((note)=>{return note._id!==id});
  setMyNotes(newNote);
};

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(
      `${host}/api/note/updatenote/670aa9d7cf3a85c4902b7dbb`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwN2Y3M2MzM2U1NWUwYzc4ZGQzMzU0In0sImlhdCI6MTcyODc1MTc3NX0.Jyg_HH3z-4Eyap8A7PIyG9tq58gMmJREvk5Tqx-OSLs"
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    //const json = response.json;

  //logic to edit in client side
    for (let index = 0; index < myNotes.length; index++) {
      const element = myNotes[index];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
      
    }
  };
  return (
    <NoteContext.Provider value={{ myNotes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
NoteState.propTypes = {
  children: PropTypes.node, // children is of type node (can be any renderable content)
};

export default NoteState;
