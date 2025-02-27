"use client";
import ChatForm from "@/components/chat/ChatForm";
import ChatMessage from "@/components/chat/ChatMessage";
import { socket } from "@/utils/socketClient";
import { useEffect, useState, useRef } from "react";

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export default function ChatPage() {
  const [room, setRoom] = useState("");
  const [username, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  const chatContainerRef = useRef<HTMLDivElement>(null); // ✅ Ref to control scrolling

  useEffect(() => {
    if (room && username) {
      handleJoinRoom();
    }
  }, []);

  useEffect(() => {
    socket.on(
      "message",
      (data: { room: string; message: string; sender: string }) => {
        setMessages((prev) => [data, ...prev]); // ✅ New messages appear at the top
      }
    );

    socket.on("user-joined", (message: string) => {
      setMessages((prev) => [{ sender: "system", message: message }, ...prev]);
    });

    return () => {
      socket.off("message");
      socket.off("user-joined");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // ✅ Scroll to the top on new messages
    }
  }, [messages]);

  function handleJoinRoom() {
    if (room && username) {
      socket.emit("join-room", { room, userName: username });
      setJoined(true);
    } else {
      console.warn("⚠️ Room or Username is empty");
    }
  }

  function handleSendMessage(message: string) {
    const data = { room, message, sender: username };
    setMessages((prev) => [data, ...prev]); // ✅ New messages added at the top
    socket.emit("message", data);
  }

  return (
    <div className="flex h-screen py-10 justify-center w-full">
      {!joined ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">
            Join/Create Chat Room
          </h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            placeholder="Enter your User Name"
          />
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            placeholder="Enter Room Number"
          />
          <button
            className="px-3 py-2 w-fit mx-auto text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center gap-2"
            onClick={handleJoinRoom}
          >
            Join/Create Room
          </button>
        </div>
      ) : (
        <div className="w-3/4 h-full mx-auto">
          <h1 className="mb-4 text-2xl font-bold">ChatRoom: {room}</h1>
          <div
            ref={chatContainerRef}
            className="h-3/4 w-full overflow-y-auto no-scrollbar p-4 mb-4 bg-gray-200 border-2 border-orange-600 rounded-lg flex flex-col-reverse"
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === username}
              />
            ))}
            <p className="w-fit mx-auto px-2 py-1 mb-2 rounded-lg text-xs bg-black text-gray-200">
              {day + "-" + month + "-" + year}
            </p>
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
