"use client";

import React, { useState, useEffect } from "react";
import { socket } from "@/utils/socketClient";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim() != "") {
      onSendMessage(message);
      setMessage("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white w-full  mt-6"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="p-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center gap-2"
      >
        <span>Send</span>
      </button>
    </form>
  );
};

export default ChatForm;
