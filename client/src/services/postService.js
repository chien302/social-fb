import * as request from "../utils/request";

export const getProfilePost = async ({ username, accessToken }) => {
  try {
    const res = await request.get(`/post/profile/${username}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {}
};

export const getFollowingPost = async ({ accessToken }) => {
  try {
    const res = await request.get(`/post/timeline/all`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {}
};

export const createPost = async ({ newPost, accessToken }) => {
  try {
    const res = await request.post("/post", newPost, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res;
  } catch (error) {}
};
export const deletePost = async ({ postId, accessToken }) => {
  try {
    const res = await request.del(`/post/${postId}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res;
  } catch (error) {}
};
export const likePost = async ({ postId, accessToken }) => {
  try {
    const res = await request.put(`/post/${postId}/like`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res;
  } catch (error) {}
};
