import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/User/Home/Home";
import Register from "./pages/User/Register/Register";
import Login from "./pages/User/Login/Login";
import DetailRoom from "./pages/User/DetailRoom/DetailRoom";
import RoomList from "./pages/User/RoomList/RoomList";
import Profile from "./pages/User/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import LocationManagement from "./pages/Admin/LocationManagement/LocationManagement";
import AppRoute from "./api/AppRoute";
type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route element={<RoomList />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<DetailRoom />}></Route>
          </Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='*' element={<Navigate to='' />}></Route>
        </Route>
        <Route path='admin' element={<AppRoute />}>
          <Route path='UM' element={<UserManagement />}></Route>
          <Route path='LM' element={<LocationManagement />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
