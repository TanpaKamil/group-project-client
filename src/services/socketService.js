import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.heartbeatInterval = null;
    }

    connect() {
        if (this.socket) {
            return this.socket;
        }

        this.socket = io('https://xazerly.biz.id', {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 20000,
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.startHeartbeat();
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.stopHeartbeat();
        });

        return this.socket;
    }

    startHeartbeat() {
        if (this.heartbeatInterval) return;
        
        this.heartbeatInterval = setInterval(() => {
            if (this.socket?.connected) {
                this.socket.emit('heartbeat');
            }
        }, 30000);
    }

    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    disconnect() {
        if (this.socket) {
            this.stopHeartbeat();
            this.socket.disconnect();
            this.socket = null;
        }
    }

    emit(event, data) {
        if (!this.socket?.connected) {
            console.error('Socket not connected');
            return;
        }
        this.socket.emit(event, data);
    }

    on(event, callback) {
        if (!this.socket) {
            this.connect();
        }
        this.socket.on(event, callback);
    }

    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }
}

const socketService = new SocketService();
export default socketService;