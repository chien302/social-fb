import * as request from "../utils/request";

export const uploadFile = async ({ data, accessToken }) => {
  try {
    const res = await request.post(`/upload`, data, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
