"use client";

import { io } from "socket.io-client";

const SOCKET_URL = "https://ride-sharing-app-chat-bot-backend.onrender.com/"; // Updated to match server port

export const socket = io(SOCKET_URL, {
  autoConnect: true, // Ensures socket connects when imported
});
