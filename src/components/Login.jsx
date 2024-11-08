import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = (props) => {
    let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //save auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Logged in successfully", "success");
    }
    else{
        props.showAlert("Invalid credentials", "warning");
    }
  };
  return (
    <div className="login">
        <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-body">
          Submit
        </button>
      </form>
    </div>
  );
};
Login.propTypes={
    showAlert: PropTypes.func
}

export default Login;
