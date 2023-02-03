import axios from "axios";
import { getStore } from "src/utils/setting";

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000,
  headers: {
    tokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
    // token: process.env.REACT_APP_CYBERSOFT_TOKEN_ADMIN,

    // => Để Authorization ở đây, thì khi user chưa đăng nhập thì các resquest Authorization  không có

    // Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

// interceptor is between the client and the server

requester.interceptors.request.use(
  (req) => {
    //Do something before request is sent
    req.headers = {
      ...req.headers,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    //  must return  if the request is blocked
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
); // block request

// requester.interceptors.response.use();
requester.interceptors.response.use(
  (response) => {
    // console.log(response?.data.content);
    return response;
  },
  (err) => {
    // const originalRequest = error.config;
    console.log(err.response?.status);
    if (err.response.status === 400 || err.response.status === 404) {
      // history.push("/");
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
      alert("Token không hợp lệ ! Vui lòng đăng nhập lại !");
      // history.push("/login");
      return Promise.reject(err);
    }
  }
);
export default requester;

// routing protection

// angular => guard
