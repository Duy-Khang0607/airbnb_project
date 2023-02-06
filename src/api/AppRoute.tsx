import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { RootState } from "../redux/configStore";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  getStore,
  getStoreJSON,
} from "src/utils/setting";
type Props = {
  component: any;
  isPrivate?: any;
  isAuth?: any;
  isAdmin: any;
};

const AppRoute = ({
  component: Component,
  // isPrivate,
  // isAuth,
  isAdmin,
  ...routeProps
}: Props) => {
  const token = getStore(ACCESS_TOKEN);
  const profile = useSelector(
    (state: RootState) => state.SignInReducer.userLogin
  );
  const maLoaiNguoiDung = localStorage.getItem("isAdmin");
  // const role = getStoreJSON(USER_LOGIN);
  // const maLoaiNguoiDung = role?.user.role;

  // if (props.isPrivate) {
  //   if (token) return <Component />; // or check profile
  //   return <Navigate to="/login" replace />;
  // }

  // if (props.isAuth) {
  //   if (!profile) return <Component />;
  //   return <Navigate to="/" replace />;
  // }

  if (isAdmin) {
    console.log(maLoaiNguoiDung);
    if (maLoaiNguoiDung === "ADMIN") return <Component />;
    return <Navigate to='/login' replace />;
  }

  return <Component />;
};

export default AppRoute;
