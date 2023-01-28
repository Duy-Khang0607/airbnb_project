import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";

type Props = {
  children: any;
};

const PrivateRoute = (props: Props) => {
  const authAdmin = useSelector((state: RootState) => state.UserReducer);
  console.log(authAdmin);
  if (!authAdmin) {
    // not logged in so redirect to login page with the return url
    return <Navigate to='/login' />;
  }

  return props.children;
};

export default PrivateRoute;
