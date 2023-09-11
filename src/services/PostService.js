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
  createPost: async function (post) {
    const res = await axiosInstance.post("/post", post);
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
  updPost: async function (id, post) {
    const res = await axiosInstance.put(`/post/${id}`, post);
    return res.data;
  },
  deletePost: async function (id) {
    const res = await axiosInstance.delete(`/post/${id}`);
    return res.data;
  },
};
