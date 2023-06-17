import { Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPage from "../pages/ForgetPage";
import ResetPage from "../pages/ResetPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedPage from "./ProtectedPage";

const routes = [
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/home"
    element={
      <ProtectedPage needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/forget"
    element={
      <ProtectedPage guestOnly={true}>
        <ForgetPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/reset/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <ResetPage />
      </ProtectedPage>
    }
  />,
];

export default routes;
