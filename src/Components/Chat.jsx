import React, { useEffect, useState } from "react";
import { User, Send, Phone, Video } from "lucide-react";
import io from 'socket.io-client'

export default function Chat() {
  

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
            <span className="text-sm text-gray-300">Active now</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto bg-base-200 h-full py-4">
        {/* Incoming Message */}
        <div className="chat chat-start mb-4 ml-8">
          <div>
            <div className="chat-header mb-1 text-sm text-gray-600">
              John Doe
            </div>
            <div className="chat-bubble bg-blue-100 text-gray-800">
              Hello! How can I help you today?
            </div>
          </div>
        </div>

        {/* Outgoing Message */}
        <div className="chat chat-end mb-4">
          <div>
            <div className="chat-header mb-1 text-sm text-gray-600">Me</div>
            <div className="chat-bubble bg-[#A9C46C] text-white">
              I'd like to know about ticket prices
            </div>
            <div className="chat-footer opacity-50 text-xs mt-1">Seen</div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#5CB338] border-t">
        <div className="flex gap-2">
          <textarea
            className="textarea textarea-bordered flex-1 resize-none h-12"
            placeholder="Type a message..."
            rows="1"
          ></textarea>
          <button className="btn btn-primary btn-circle bg-[#A9C46C] hover:bg-[#8a9c4a]">
            <Send className="h-5 w-5" />
          </button>
        </div>

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
