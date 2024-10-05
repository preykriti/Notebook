

export default function About(props) {
    // const [myStyle,setMyStyle]= useState({
    //     color: 'black',
    //     backgroundColor: "white",
    //     border: "1px solid white"
    // });
    let myStyle = {
      color: props.mode === "dark" ? "white" : "#212529",
      backgroundColor: props.mode === "dark" ? "#212529" : "white",
    };
    

  return (
    <div className="container">
      <h1
        className="my-2"
        style={{ color: props.mode === "dark" ? "white" : "#212529" }}
      >
        About Us
      </h1>
      <div
        className="accordion accordion-flush"
        id="accordionFlushExample"
        
      >
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              style={myStyle}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <strong>Text Analysis Made Simple</strong>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={myStyle}>
              With TextUtils, you can quickly analyze any text by counting the
              number of words, characters, and even spaces. Our intuitive
              platform gives you instant results, ensuring that you always stay
              informed about the size and complexity of your text. This is
              especially useful for meeting word count requirements or ensuring
              brevity in content creation.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              style={myStyle}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              <strong>Seamless Text Transformations</strong>
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={myStyle}>
              Whether you need to convert text from lowercase to uppercase, or
              vice versa, TextUtils handles it with ease. One-click
              transformations allow you to shift between different cases
              effortlessly, making formatting tasks faster and more efficient.
              You can also reverse entire texts to add a fun twist or experiment
              with creative writing.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              style={myStyle}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              <strong>User-Friendly and Accessible</strong>
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={myStyle}>
              TextUtils is built with simplicity and accessibility in mind. Its
              clean interface ensures that even beginners can navigate through
              the tools easily. There’s no need for complicated installations or
              plugins—just open the website, input your text, and start
              analyzing or transforming it in seconds!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
