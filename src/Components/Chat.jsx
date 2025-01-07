import React from "react";
import { User, Send, Phone, Video } from "lucide-react";

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <div className="navbar bg-warning shadow-lg px-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold tracking-wide">
            RAGUNAN ONLINE
          </a>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-ghost btn-circle">
            <Phone className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Video className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex justify-center p-4 flex-1">
        <div className="bg-white rounded-lg shadow-xl w-[360px] flex flex-col">
          {/* User Info Header */}
          <div className="p-4 bg-base-300 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="avatar online">
                <div className="w-12 h-12 rounded-full">
                  <img src="/api/placeholder/40/40" alt="User avatar" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  VISITOR ROOM
                </h2>
                <div className="flex items-center gap-2">
                  <div className="badge badge-success">Online</div>
                  <span className="text-sm text-gray-300">Active now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50 min-h-[400px]">
            {/* Incoming Message */}
            <div className="chat chat-start mb-4">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img src="/api/placeholder/30/30" alt="User avatar" />
                </div>
              </div>
              <div>
                <div className="chat-header mb-1">
                  John Doe
                  <time className="text-xs opacity-50 ml-2">12:45</time>
                </div>
                <div className="chat-bubble bg-blue-100 text-gray-800">
                  Hello! How can I help you today?
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">
                  Delivered
                </div>
              </div>
            </div>

            {/* Outgoing Message */}
            <div className="chat chat-end mb-4">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img src="/api/placeholder/30/30" alt="User avatar" />
                </div>
              </div>
              <div>
                <div className="chat-header mb-1">
                  You
                  <time className="text-xs opacity-50 ml-2">12:46</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">
                  I'd like to know about ticket prices
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">Seen</div>
              </div>
            </div>

            {/* User Status Message */}
            <div className="text-center my-4">
              <span className="badge badge-sm">John Doe is typing...</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t rounded-b-lg">
            <div className="flex gap-2">
              <textarea
                className="textarea textarea-bordered flex-1 resize-none h-12"
                placeholder="Type a message..."
                rows="1"
              ></textarea>
              <button className="btn btn-primary btn-circle">
                <Send className="h-5 w-5" />
              </button>
            </div>
            {/* Connection Status */}
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
