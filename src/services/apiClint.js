import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `https://easyrentapi0.runasp.net`,
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status == 401) {
      window.location.href = "http://localhost:5173/login";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);
