import { Navigate, Outlet } from "react-router";

export default function Authentication() {
  const isAuth = localStorage.visitorName;
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
