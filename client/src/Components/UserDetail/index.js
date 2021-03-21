import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { fetchUser, signOutUser } from "./helper";

const UserDetails = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUser();
      const { data: { status, statusCode } = {} } = response;
      if (!status && statusCode === 401) {
        props.history.push("/");
      }
      const { data: { data = {} } = {} } = response || {};
      setUser(data);
    }
    fetchData();
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    props.history.push("/change-password");
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    props.history.push("/change-password");
    const response = await signOutUser();
    const { data: { status } = {} } = response;
    if (status) {
      props.history.push("/sign-in");
    } else {
      //   const { message } = response;
      //   setSignInError(message);
    }
  };

  const { name, age, email, phone } = user;
  return (
    <div style={{ margin: "20px" }}>
      <h1>User Detaisl</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h4>Name - </h4>
        <h5 style={{ marginLeft: 16 }}>{name}</h5>
      </div>
      <div style={{ display: "flex" }}>
        <h4>Age - </h4>
        <h5 style={{ marginLeft: 16 }}> {age}</h5>
      </div>
      <div style={{ display: "flex" }}>
        <h4>Email - </h4>
        <h5 style={{ marginLeft: 16 }}> {email}</h5>
      </div>
      <div style={{ display: "flex" }}>
        <h4>Phone - </h4>
        <h5 style={{ marginLeft: 16 }}> {phone}</h5>
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit" onClick={handleChangePassword}>
          ChangePassword
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit" onClick={handleSignOut}>
          SignOut
        </button>
      </div>
    </div>
  );
};

const UserDetailsPage = (props) => {
  return <UserDetails {...props} />;
};

export default withRouter(UserDetailsPage);
