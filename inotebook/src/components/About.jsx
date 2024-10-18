import { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext.jsx";

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, [a]);
  return (
    <div>
      About {a.state.name} and her email is {a.state.email}
    </div>
  );
};

export default About;