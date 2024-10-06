import { useState } from "react";
import PropTypes from "prop-types";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleOnChange = (event) => {
    console.log("this is on change");
    setText(event.target.value);
  };

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleLowClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase", "success");
  };
  const handleClear = () => {
    setText("");
  };
  const handleReverse = () => {
    const newText = text.split(" ").reverse().join(" ");
    setText(newText);
  };

  return (
    <div>
      <div className="mb-3 container">
        <h1>{props.heading}</h1>
        <textarea
          style={{
            backgroundColor: props.mode === "light" ? "white" : "#212529",
            color: props.mode === "light" ? "black" : "white",
          }}
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="3"
        ></textarea>
        <button
          disabled={text.length === 0}
          type="button"
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } mx-1 my-1`}
          onClick={handleUpClick}
        >
          To Uppercase
        </button>
        <button
          disabled={text.length === 0}
          type="button"
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } mx-1 my-1`}
          onClick={handleLowClick}
        >
          To Lowercase
        </button>
        <button
          disabled={text.length === 0}
          type="button"
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } mx-1 my-1`}
          onClick={handleClear}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          type="button"
          className={`btn btn-${
            props.mode === "light" ? "dark" : "light"
          } mx-1 my-1`}
          onClick={handleReverse}
        >
          Reverse Text
        </button>
      </div>

      <div className="container">
        <h2>Text Summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
      </div>
      <div className="container">
        <h2>Text Preview</h2>
        <p>
          {text.length > 0 ? text : "Nothing to preview"}
        </p>
      </div>
    </div>
  );
}
TextForm.propTypes = {
  heading: PropTypes.string.isRequired, // Add validation for heading
  mode: PropTypes.string.isRequired,
  showAlert: PropTypes.func,
};
