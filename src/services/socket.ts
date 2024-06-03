"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_BACK_SOCKET_URL!, {
  transports: ["websocket"],
  extraHeaders: {
    "key-token": "test" + (window as any).Telegram.WebApp.initDataUnsafe,
  },
}).connect();

export enum EventType {
  UpdateUserBalance = "UserBalance",
  UpdateHistory = "UpdateHistory",
}
