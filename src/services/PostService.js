import { axiosInstance } from "./axiosInstance";

export const PostService = {
  getAll: async function () {
    const res = await axiosInstance.get("/post");
    return res.data;
  },
  getPostById: async function (id) {
    const res = await axiosInstance.get(`/post/${id}`);
    return res.data;
  },
  createPost: async function (token, post) {
    const res = await axiosInstance.post("/post", post, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
  myPosts: async function (token) {
    const res = await axiosInstance.get("/my", {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
  updPost: async function (id, token, post) {
    const res = await axiosInstance.put(`/post/${id}`, post, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
  deletePost: async function (id, token) {
    const res = await axiosInstance.delete(`/post/${id}`, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
};
