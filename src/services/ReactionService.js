import { axiosInstance } from "./axiosInstance";

export const ReactionService = {
  getLike: async function (id) {
    const res = await axiosInstance.get(`/like/${id}`);
    return res.data;
  },
  getDislike: async function (id) {
    const res = await axiosInstance.get(`/dislike/${id}`);
    return res.data;
  },
};
