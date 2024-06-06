import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_BACK_SOCKET_URL!, {
  transports: ["websocket"],
});

export enum EventType {
  UpdateUserBalance = "UserBalance",
  UpdateHistory = "UpdateHistory",
}
