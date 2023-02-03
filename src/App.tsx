import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppRoute from "./api/AppRoute";
import PrivateRoute from "./api/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import LocationManagement from "./pages/Admin/LocationManagement/LocationManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import DetailRoom from "./pages/User/DetailRoom/DetailRoom";
import Home from "./pages/User/Home/Home";
import Login from "./pages/User/Login/Login";
import LoginAdmin from "./pages/Admin/Login/LoginAdmin";
import RegisterAdmin from "./pages/Admin/Register/RegisterAdmin";
import Profile from "./pages/User/Profile/Profile";
import Register from "./pages/User/Register/Register";
import Roombycity from "./pages/User/RoomList/Roombycity";
import AdminTemplate from "./templates/AdminTemplate";
import HomeTemplate from "./templates/HomeTemplate";
import Modaltest from "./HOC/Modaltest";
import RoomManagement from "./pages/Admin/BookingManagement/RoomManagement";

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='roombycity' element={<Roombycity />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<DetailRoom />}></Route>
          </Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path='admin' element={<AdminTemplate />}>
          <Route index path='' element={<Dashboard />}></Route>
          <Route path='user' element={<UserManagement />}></Route>
          <Route path='location' element={<LocationManagement />}></Route>
          <Route path='room' element={<RoomManagement />}></Route>
          <Route path='loginAD' element={<LoginAdmin />}></Route>
          <Route path='registerAD' element={<RegisterAdmin />}></Route>
          <Route path='modalTest' element={<Modaltest />}></Route>
        </Route>
        <Route path='*' element={<Navigate to='' />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
