import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { updatePassword } from "./helper";

const ChangePassword = (props) => {
  const [prevPassword, setPrevPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errormsg, setErrormsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updatePassword({
      prevPassword,
      newPassword,
      confirmPassword,
    });
    const { data: { status, statusCode } = {} } = response;
    if (status) {
      props.history.push("/users");
    } else {
      if (statusCode === 401) {
        props.history.push("/");
      }
      const { data: { message } = {} } = response;
      setErrormsg(message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Current Password</p>
          <input
            type="password"
            onChange={(e) => setPrevPassword(e.target.value)}
          />
        </label>
        <label>
          <p>New Password</p>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errormsg && <p style={{ color: "red", margin: 8 }}>{errormsg}</p>}
        <div style={{ marginTop: 16 }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

const ChangePasswordPage = (props) => {
  return <ChangePassword {...props} />;
};

export default withRouter(ChangePasswordPage);
