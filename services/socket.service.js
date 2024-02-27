import { loggerService } from "./logger.service.js";
import { Server } from "socket.io";

const SOCKET_ADD_CODE = "SOCKET_ADD_CODE";
const SOCKET_SEND_CODE = "SOCKET_SEND_CODE";

var gIo = null;

export function setupSocketAPI(http) {
  gIo = new Server(http, {
    cors: {
      origin: "*",
    },
  });

  gIo.on("connection", (socket) => {
    loggerService.info("a user connected");

    socket.on("disconnect", () => {
      loggerService.info("user disconnected");
    });

    socket.on(SOCKET_SEND_CODE, (data) => {
      loggerService.info("SOCKET_ADD_CODE", data);
      socket.broadcast.emit(SOCKET_ADD_CODE, data);
    });
  });
}

export function emitToAll(event, data) {
  gIo.emit(event, data);
}

export const socketService = {
  setupSocketAPI,
  emitToAll,
};
