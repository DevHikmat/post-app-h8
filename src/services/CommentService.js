import { axiosInstance } from "./axiosInstance";

export const CommentService = {
  addComment: async function (comment) {
    const res = await axiosInstance.post("/comment", comment);
    return res.data;
  },
  updComment: async function (id, content) {
    const res = await axiosInstance.put(`/comment/${id}`, content);
    return res.data;
  },
  delComment: async function (id) {
    const res = await axiosInstance.delete(`/comment/${id}`);
    return res.data;
  },
};
