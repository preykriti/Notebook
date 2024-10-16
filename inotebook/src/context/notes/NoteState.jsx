import { useState } from "react";
import NoteContext from "./noteContext.jsx";
import PropTypes from "prop-types";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "670aa9d7cf3a85c4902b7dbb",
      user: "6707f73c33e55e0c78dd3354",
      title: "Veggies Names",
      description: "cucumber, tomato",
      tag: "personal",
      date: "2024-10-12T16:54:47.706Z",
      __v: 0,
    },
    {
      _id: "670b759373239f7dab069edc",
      user: "6707f73c33e55e0c78dd3354",
      title: "Meeting",
      description: "Meeting on next Friday 10 am",
      tag: "Work",
      date: "2024-10-13T07:24:03.573Z",
      __v: 0,
    },
    {
      _id: "670aa9d7cf3a85c4902b7dbb",
      user: "6707f73c33e55e0c78dd3354",
      title: "Veggies Names",
      description: "cucumber, tomato",
      tag: "personal",
      date: "2024-10-12T16:54:47.706Z",
      __v: 0,
    },
    {
      _id: "670b759373239f7dab069edc",
      user: "6707f73c33e55e0c78dd3354",
      title: "Meeting",
      description: "Meeting on next Friday 10 am",
      tag: "Work",
      date: "2024-10-13T07:24:03.573Z",
      __v: 0,
    },
    {
      _id: "670aa9d7cf3a85c4902b7dbb",
      user: "6707f73c33e55e0c78dd3354",
      title: "Veggies Names",
      description: "cucumber, tomato",
      tag: "personal",
      date: "2024-10-12T16:54:47.706Z",
      __v: 0,
    },
    {
      _id: "670b759373239f7dab069edc",
      user: "6707f73c33e55e0c78dd3354",
      title: "Meeting",
      description: "Meeting on next Friday 10 am",
      tag: "Work",
      date: "2024-10-13T07:24:03.573Z",
      __v: 0,
    },
  ];
  const [myNotes, setMyNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ myNotes, setMyNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
NoteState.propTypes = {
  children: PropTypes.node, // children is of type node (can be any renderable content)
};

export default NoteState;
