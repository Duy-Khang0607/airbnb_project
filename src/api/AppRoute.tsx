import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RootState } from "../redux/configStore";
type Props = {
  component: any;
  isPrivate: any;
  isAuth: any;
  isAdmin: any;
};

const AppRoute = (props: Props) => {
  const token = localStorage.getItem("token");
  const profile = useSelector((state: RootState) => state.UserReducer);
  const maLoaiNguoiDung = localStorage.getItem("isAdmin");

  if (props.isPrivate) {
    if (token) return <Component />; // or check profile
    return <Navigate to="/login" replace />;
  }

  if (props.isAuth) {
    if (!profile) return <Component />;
    return <Navigate to="/" replace />;
  }

  if (props.isAdmin) {
    console.log(maLoaiNguoiDung);
    if (maLoaiNguoiDung === "ADMIN") return <Component />;
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default AppRoute;
