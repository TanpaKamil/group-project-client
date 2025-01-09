import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Authentication() {
  const { visitorName } = useContext(UserContext);
  
  if (!visitorName) {
    return <Navigate to="/login" />;
  }
  
  return <Outlet />;
}