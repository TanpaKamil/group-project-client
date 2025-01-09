import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import socketService from '../services/socketService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [visitorName, setVisitorName] = useState(() => 
        localStorage.getItem('visitorName') || ''
    );
    const [sessionId, setSessionId] = useState(() => 
        localStorage.getItem('sessionId') || ''
    );
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    const initializeSocket = useCallback(() => {
        const socket = socketService.connect();

        socket.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
            if (error === 'Session already connected') {
                clearSession();
                navigate('/login');
            }
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('error');
        };
    }, [navigate]);

    // Initialize socket once on mount
    useEffect(() => {
        const cleanup = initializeSocket();
        return cleanup;
    }, [initializeSocket]);

    // Handle session setup when credentials change
    useEffect(() => {
        if (visitorName && sessionId && isConnected) {
            console.log('Joining room with:', { visitorName, sessionId });
            socketService.emit('join_room', { visitorName, sessionId });
        }
    }, [visitorName, sessionId, isConnected]);

    // Persist to localStorage
    useEffect(() => {
        if (visitorName) {
            localStorage.setItem('visitorName', visitorName);
        } else {
            localStorage.removeItem('visitorName');
        }
    }, [visitorName]);

    useEffect(() => {
        if (sessionId) {
            localStorage.setItem('sessionId', sessionId);
        } else {
            localStorage.removeItem('sessionId');
        }
    }, [sessionId]);

    const clearSession = useCallback(() => {
        setVisitorName('');
        setSessionId('');
        localStorage.removeItem('visitorName');
        localStorage.removeItem('sessionId');
    }, []);

    return (
        <UserContext.Provider 
            value={{
                visitorName,
                setVisitorName,
                sessionId,
                setSessionId,
                clearSession,
                isConnected
            }}
        >
            {children}
        </UserContext.Provider>
    );
};