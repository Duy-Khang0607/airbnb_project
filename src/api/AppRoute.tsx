import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RootState } from "../redux/configStore";
type Props = {
  isPrivate: boolean;
  isAuth: boolean;
  isAdmin: boolean;
  component: Component;
};

const AppRoute = (props: Props) => {
  const token = localStorage.getItem("token");
  const profile = useSelector((state: RootState) => state.user.profile);
  const maLoaiNguoiDung = localStorage.getItem("isAdmin");
  if (props.isPrivate) {
    if (token) return <Component />; // or check profile
    return <Navigate to='/login' replace />;
  }

  if (props.isAuth) {
    if (!profile) return <Component />;
    return <Navigate to='/' replace />;
  }

  if (props.isAdmin) {
    if (maLoaiNguoiDung === "QuanTri") return <Component />;
    return <Navigate to='/login' replace />;
  }

  return <Component />;
};

export default AppRoute;
