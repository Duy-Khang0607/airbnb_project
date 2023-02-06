import axios from "axios";
import { history } from "src/App";
import { ACCESS_TOKEN, getStore } from "src/utils/setting";

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000,
  headers: {
    tokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
    token: getStore(ACCESS_TOKEN),
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
);
export default requester;

// routing protection

// angular => guard
