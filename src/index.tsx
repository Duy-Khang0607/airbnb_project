import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/User/Home/Home";
import Register from "./pages/User/Register/Register";

import Search from "./pages/User/Search/Search";
import Detail from "./pages/User/Detail/Detail";
import Login from "./pages/User/Login/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<HomeTemplate />}>
        <Route index element={<Home />}></Route>
        <Route path='detail'>
          <Route path=':id' element={<Detail />}></Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='search' element={<Search />}></Route>
        <Route path='*' element={<Navigate to='' />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
