import React from "react";
import {
  unstable_HistoryRouter as HistoryRouter,
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
// import Profile from "./pages/User/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate";
import HomeTemplate from "./templates/HomeTemplate";
import Loading from "./components/Loading/Loading";
import { createBrowserHistory } from "history";
import AppRoute from "./api/AppRoute";
export const history = createBrowserHistory({ window });
type Props = {};
// Admin Template
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
// User Template
const Home = React.lazy(() => import("src/pages/User/Home/Home"));
const Roombycity = React.lazy(
  () => import("src/pages/User/RoomByCity/Roombycity")
);
const DetailRoom = React.lazy(
  () => import("src/pages/User/DetailRoom/DetailRoom")
);
const Register = React.lazy(() => import("src/pages/User/Register/Register"));
const Login = React.lazy(() => import("src/pages/User/Login/Login"));
const Profile = React.lazy(() => import("src/pages/User/Profile/Profile"));
//-----------------------------
const App = (props: Props) => {
  return (
    <HistoryRouter history={history as any}>
      <Routes>
        {/* Home Template */}
        <Route path='' element={<HomeTemplate />}>
          <Route
            index
            element={
              <React.Suspense fallback={<Loading />}>
                <Home />
              </React.Suspense>
            }></Route>
          <Route path='roombycity'>
            <Route
              path=':id'
              element={
                <React.Suspense fallback={<Loading />}>
                  <Roombycity />
                </React.Suspense>
              }></Route>
          </Route>
          <Route path='detail'>
            <Route
              path=':id'
              element={
                <React.Suspense fallback={<Loading />}>
                  <AppRoute component={DetailRoom} isPrivate />
                </React.Suspense>
              }></Route>
          </Route>
          <Route
            path='register'
            element={
              <React.Suspense fallback={<Loading />}>
                <Register />
              </React.Suspense>
            }></Route>
          <Route
            path='login'
            element={
              <React.Suspense fallback={<Loading />}>
                <AppRoute component={Login} isAuth />
              </React.Suspense>
            }></Route>
          <Route
            path='profile'
            element={
              <React.Suspense fallback={<Loading />}>
                <Profile />
              </React.Suspense>
            }></Route>
        </Route>

        {/* Admin Template */}
        <Route
          path='admin'
          element={<AppRoute component={AdminTemplate} isAdmin />}>
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
          <Route
            path='profile'
            element={
              <React.Suspense fallback={<Loading />}>
                <Profile />
              </React.Suspense>
            }></Route>
        </Route>

        <Route path='*' element={<Navigate to='' />}></Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
