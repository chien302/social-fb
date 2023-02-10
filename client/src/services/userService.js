import * as request from "../utils/request";

export const getUser = async (username) => {
  try {
    const res = await request.get("/user", {
      params: {
        username,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAllAccountUser = async ({ accessToken }) => {
  try {
    const res = await request.get(`/user`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getFollowingUser = async ({ userId, accessToken }) => {
  try {
    const res = await request.get(`/user/friends/${userId}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getProfileUser = async ({ username, accessToken }) => {
  try {
    const res = await request.get(`/user/${username}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async ({ userId, accessToken }) => {
  try {
    const res = await request.put(`/user/${userId}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async ({ userId, accessToken }) => {
  try {
    const res = await request.put(`/user/${userId}/follow`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const searchUser = async ({ searchText, accessToken }) => {
  try {
    const res = await request.get(`/user/search?name=${searchText}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
