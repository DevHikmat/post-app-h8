import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://webstar-post-app.onrender.com/api",
});

// export const setAxiosInstanceToken = (token) => {
//   axiosInstance.defaults.headers.common["access_token"] = token;
// };
