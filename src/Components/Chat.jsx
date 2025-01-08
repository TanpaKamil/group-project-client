import React, { useEffect, useState } from "react";
import { User, Send, Phone, Video } from "lucide-react";
import io from "socket.io-client";
import MessageUser from "./MessageUser";
import MessageOthers from "./MessageOthers";

const SOCKET_URL = "http://localhost:3000";

export default function Chat() {
  const visitorName = localStorage.visitorName;

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Join room when socket connects
    newSocket.on("connect", () => {
      newSocket.emit("join_room", localStorage.visitorName);
    });


    newSocket.on("visitor_joined", (visitorsList) => {
      setVisitors(visitorsList);
    });

    newSocket.on("chat_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("interaction_event", (event) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          message: `${visitorName} ${event.action} the animal!`,
        },
      ]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [visitorName]);

  // Handle chat message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit("send_message", newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="w-[540px] flex flex-col justify-between h-full">
      <div className="top-0 p-4 bg-[#5CB338]">
        <div className="ml-2">
          <h2 className="text-lg font-semibold text-white mb-1">
            VISITORS CHAT ROOM
          </h2>
          {/* Status Connection */}
          <div className="flex items-center gap-2">
            <div className="badge badge-info">
              <p className="text-info-content">Online</p>
            </div>
            <span className="text-sm text-gray-300">{visitorName} visiting Zoo</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto bg-base-200 h-full py-4">
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
      <div className="p-4 bg-[#5CB338]">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <textarea
            className="textarea textarea-bordered flex-1 resize-none h-12"
            placeholder="Type a message..."
            rows="1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary btn-circle bg-[#A9C46C] hover:bg-[#8a9c4a]"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        {/* Connection Status */}
        <div className="text-center mt-2">
          <span className="text-xs text-neutral-content">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Connected
          </span>
        </div>
      </div>
    </div>
  );
}
