import { Navigate, Outlet } from "react-router";

export default function Authentication() {
  const isAuth = localStorage.access_token;
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
