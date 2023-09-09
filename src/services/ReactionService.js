import { axiosInstance } from "./axiosInstance";

export const ReactionService = {
  getLike: async function (id, token) {
    const res = await axiosInstance.get(`/like/${id}`, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
  getDislike: async function (id, token) {
    const res = await axiosInstance.get(`/dislike/${id}`, {
      headers: {
        access_token: token,
      },
    });
    return res.data;
  },
};
