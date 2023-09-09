import { axiosInstance } from "./axiosInstance";

export const CommentService = {
  addComment: async function (token, comment) {
    const res = await axiosInstance.post("/comment", comment, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
  updComment: async function (token, id, content) {
    const res = await axiosInstance.put(`/comment/${id}`, content, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
  delComment: async function (token, id) {
    const res = await axiosInstance.delete(`/comment/${id}`, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
};
