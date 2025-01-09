import { useEffect, useState, useContext } from "react";
import { Send } from "lucide-react";
import MessageUser from "./MessageUser";
import MessageOthers from "./MessageOthers";
import { UserContext } from "../contexts/UserContext";
import socketService from "../services/socketService";

export default function Chat() {
  const { visitorName, isConnected } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!visitorName) return;

    // Set up message handlers
    socketService.on("chat_message", (message) => {
      setMessages((prev) => [...prev, message]);
      // Auto-scroll to latest message
      setTimeout(() => {
        const chatContainer = document.getElementById("chat-messages");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    });

    socketService.on("interaction_event", (event) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          message: `${event.user} ${event.action} the animal!`,
        },
      ]);
    });

    // Cleanup
    return () => {
      socketService.off("chat_message");
      socketService.off("interaction_event");
    };
  }, [visitorName]);

  // Handle chat message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && isConnected) {
      socketService.emit("send_message", newMessage.trim());
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
                isConnected ? "badge-success" : "badge-error"
              }`}
            >
              <p className="text-info-content">
                {isConnected ? "Online" : "Offline"}
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
            disabled={!isConnected}
          ></textarea>
          <button
            type="submit"
            className={`btn btn-circle ${
              isConnected ? "bg-[#16C47F] hover:bg-[#5DB996]" : "bg-gray-400"
            }`}
            disabled={!isConnected}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        {/* Connection Status */}
        <div className="text-center mt-2">
          <span className="text-xs text-neutral-content">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>
    </div>
  );
}