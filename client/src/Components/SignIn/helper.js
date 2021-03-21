import axios from "axios";

export const signIn = async (email, password) => {
  let response = {};
  try {
    response = await axios({
      url: "/sign-in",
      baseURL: "/api",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    return error.response || {};
  }

  return response;
};
