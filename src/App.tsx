import React from "react";
import {
  unstable_HistoryRouter as HistoryRouter,
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import DetailRoom from "./pages/User/DetailRoom/DetailRoom";
import Home from "./pages/User/Home/Home";
import Login from "./pages/User/Login/Login";
import Profile from "./pages/User/Profile/Profile";
import Register from "./pages/User/Register/Register";
import Roombycity from "./pages/User/RoomList/Roombycity";
import AdminTemplate from "./templates/AdminTemplate";
import HomeTemplate from "./templates/HomeTemplate";
import Loading from "./components/Loading/Loading";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({ window });
type Props = {};

const Dashboard = React.lazy(
  () => import("src/pages/Admin/Dashboard/Dashboard")
);
const UserManagement = React.lazy(
  () => import("src/pages/Admin/UserManagement/UserManagement")
);
const LocationManagement = React.lazy(
  () => import("src/pages/Admin/LocationManagement/LocationManagement")
);
const RoomManagement = React.lazy(
  () => import("src/pages/Admin/BookingManagement/RoomManagement")
);
const LoginAdmin = React.lazy(() => import("src/pages/Admin/Login/LoginAdmin"));
const RegisterAdmin = React.lazy(
  () => import("src/pages/Admin/Register/RegisterAdmin")
);

const App = (props: Props) => {
  return (
    <HistoryRouter history={history as any}>
      <Routes>
        {/* Home Template */}
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

        {/* Admin Template */}
        <Route path='admin' element={<AdminTemplate />}>
          <Route
            index
            element={
              <React.Suspense fallback={<Loading />}>
                <Dashboard />
              </React.Suspense>
            }></Route>
          <Route
            path='user'
            element={
              <React.Suspense fallback={<Loading />}>
                <UserManagement />
              </React.Suspense>
            }></Route>
          <Route
            path='location'
            element={
              <React.Suspense fallback={<Loading />}>
                <LocationManagement />
              </React.Suspense>
            }></Route>
          <Route
            path='room'
            element={
              <React.Suspense fallback={<Loading />}>
                <RoomManagement />
              </React.Suspense>
            }></Route>
          <Route
            path='loginAD'
            element={
              <React.Suspense fallback={<Loading />}>
                <LoginAdmin />
              </React.Suspense>
            }></Route>
          <Route
            path='registerAD'
            element={
              <React.Suspense fallback={<Loading />}>
                <RegisterAdmin />
              </React.Suspense>
            }></Route>
        </Route>
        <Route path='*' element={<Navigate to='' />}></Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
