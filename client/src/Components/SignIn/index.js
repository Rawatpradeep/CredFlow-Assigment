import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { signIn } from "./helper";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signInError, setSignInError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(email, password);
    const { data: { status, statusCode } = {} } = response;
    console.log("response------------- :>> ", response);
    if (status) {
      props.history.push("/users");
    } else {
      if (statusCode === 401) {
        props.history.push("/");
      }
      const { data: { message } = {} } = response;
      setSignInError(message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Please Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {signInError && (
          <p style={{ color: "red", margin: 8 }}>{signInError}</p>
        )}
        <div style={{ marginTop: 16 }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

const LoginPage = (props) => {
  return <Login {...props} />;
};

export default withRouter(LoginPage);
