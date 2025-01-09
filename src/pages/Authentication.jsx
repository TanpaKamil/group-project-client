import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../contexts/UserContext";
import socketService from "../services/socketService";

export default function Authentication() {
    const { visitorName, isConnected } = useContext(UserContext);

    // Ensure socket connection
    useEffect(() => {
        if (!isConnected) {
            socketService.connect();
        }
    }, [isConnected]);

    if (!visitorName) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}