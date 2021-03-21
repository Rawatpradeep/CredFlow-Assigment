import axios from "axios";

export const updatePassword = async (data) => {
  try {
    const response = await axios({
      url: "/users",
      baseURL: "/api",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    return error.response || {};
  }
};
