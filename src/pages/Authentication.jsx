import { Navigate, Outlet } from "react-router";

export default function Authentication() {
  const isAuth = localStorage.username;
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
