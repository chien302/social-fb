import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = {}) => {
  const res = await request.get(path, option);
  return res.data;
};

export const post = async (path, option = {}) => {
  const res = await request.post(path, option);
  return res.data;
};

export const put = async (path, option = {}) => {
  const res = await request.put(path, option);
  return res.data;
};
export const del = async (path, option = {}) => {
  const res = await request.delete(path, option);
  return res.data;
};
export default request;
