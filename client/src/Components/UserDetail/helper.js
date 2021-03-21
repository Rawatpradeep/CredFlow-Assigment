import axios from "axios";

export const fetchUser = async () => {
  try {
    const response = await axios({
      url: "/users",
      baseURL: "/api",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    });
    return response;
  } catch (error) {
    return error.response || {};
  }
};

export const signOutUser = async () => {
  try {
    const response = await axios({
      url: "/sign-out",
      baseURL: "/api",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    });
    return response;
  } catch (error) {
    return error.response || {};
  }
};
