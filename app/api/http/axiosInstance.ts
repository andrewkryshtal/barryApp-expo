import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://barifier-8739cbad180f.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// We can have interceptor on each request

// axiosInstance.interceptors.request.use(
//   request => {
//     doWhateverWeWant();
//     return request;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log("error", error);
//     // api returns 401 or 400 on incorrect user :(
//     return Promise.reject(error);
//   }
// );

export { axiosInstance };
