import * as request from "../utils/request";

export const login = async (email, password) => {
  try {
    const res = await request.post("/auth/login", {
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (username, email, password) => {
  try {
    const res = await request.post("/auth/register", {
      username: username,
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
