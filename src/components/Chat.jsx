import { useEffect, useState, useContext } from "react";
import { Send } from "lucide-react";
import io from "socket.io-client";
import MessageUser from "./MessageUser";
import MessageOthers from "./MessageOthers";
import { UserContext } from "../contexts/UserContext"; // We'll create this next

const SOCKET_URL = "http://localhost:3000";

// Generate a unique session ID
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default function Chat() {
  const { visitorName, sessionId, setSessionId } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    if (!visitorName) return; // Don't connect if no visitor name

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Generate or retrieve session ID
    const currentSessionId = sessionId || generateSessionId();
    if (!sessionId) {
      setSessionId(currentSessionId);
    }

    // Socket connection handlers
    newSocket.on("connect", () => {
      setConnectionStatus("connected");
      console.log("Socket connected, joining with:", {
        visitorName,
        sessionId: currentSessionId,
      });

      // Join room with visitor data
      newSocket.emit("join_room", {
        visitorName,
        sessionId: currentSessionId,
      });
    });

    newSocket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    // Attempt to restore session if reconnecting
    newSocket.on("connect_error", () => {
      setConnectionStatus("error");
      if (currentSessionId) {
        newSocket.emit("reconnect_session", currentSessionId);
      }
    });

    // Session restoration handler
    newSocket.on("session_restored", (userData) => {
      console.log("Session restored:", userData);
      setConnectionStatus("connected");
    });

    // Message handlers
    newSocket.on("chat_message", (message) => {
      setMessages((prev) => [...prev, message]);
      // Auto-scroll to latest message
      setTimeout(() => {
        const chatContainer = document.getElementById("chat-messages");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    });

    newSocket.on("interaction_event", (event) => {
      console.log("Received interaction event:", event);
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          message: `${event.user} ${event.action} the animal!`,
        },
      ]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [visitorName, sessionId]);

  // Handle chat message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket && connectionStatus === "connected") {
      socket.emit("send_message", newMessage.trim());
      setNewMessage("");
    }
  };

  // Handle message input keypress
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="w-[450px] flex flex-col justify-between h-full">
      {/* Chat Header */}
      <div className="top-0 p-4 bg-[#009990]">
        <div className="ml-2">
          <h2 className="text-lg font-semibold text-white mb-1">
            VISITORS CHAT ROOM
          </h2>
          <div className="flex items-center gap-2">
            <div
              className={`badge ${
                connectionStatus === "connected"
                  ? "badge-success"
                  : connectionStatus === "connecting"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              <p className="text-info-content">
                {connectionStatus === "connected"
                  ? "Online"
                  : connectionStatus === "connecting"
                  ? "Connecting..."
                  : "Offline"}
              </p>
            </div>
            <span className="text-sm text-gray-300">
              {visitorName} visiting Zoo
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        id="chat-messages"
        className="flex-1 overflow-auto bg-base-200 h-full py-4"
      >
        {messages.map((msg, index) =>
          msg.type === "user" ? (
            visitorName === msg.user ? (
              <MessageUser key={index} msg={msg} />
            ) : (
              <MessageOthers key={index} msg={msg} />
            )
          ) : (
            <p key={index} className="w-full text-center text-gray-400">
              <i>{msg.message}</i>
            </p>
          )
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#009990]">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <textarea
            className="textarea textarea-bordered flex-1 resize-none h-12"
            placeholder="Type a message..."
            rows="1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={connectionStatus !== "connected"}
          ></textarea>
          <button
            type="submit"
            className={`btn btn-circle ${
              connectionStatus === "connected"
                ? "bg-[#16C47F] hover:bg-[#5DB996]"
                : "bg-gray-400"
            }`}
            disabled={connectionStatus !== "connected"}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        {/* Connection Status */}
        <div className="text-center mt-2">
          <span className="text-xs text-neutral-content">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                connectionStatus === "connected"
                  ? "bg-green-500"
                  : connectionStatus === "connecting"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></span>
            {connectionStatus === "connected"
              ? "Connected"
              : connectionStatus === "connecting"
              ? "Connecting..."
              : "Disconnected"}
          </span>
        </div>
      </div>
    </div>
  );
}
