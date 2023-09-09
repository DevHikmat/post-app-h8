import { axiosInstance } from "./axiosInstance";

export const AuthService = {
  login: async function (user) {
    const res = await axiosInstance.post("/login", user);
    return res.data;
  },
  register: async function (user) {
    const res = await axiosInstance.post("/signup", user);
    return res.data;
  },
};
