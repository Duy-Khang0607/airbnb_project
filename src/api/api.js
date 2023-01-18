import axios from "axios";

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    TokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
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

export default requester;

// routing protection

// angular => guard
