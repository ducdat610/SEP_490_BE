import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app); // app là Express app của bạn
const io = new Server(server);

// Khi một client kết nối
io.on("connection", (socket) => {
  console.log("A user connected");

  // Nghe khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Trong hàm cập nhật status booking
if (status === "completed") {
  await sendEmailBookingCompleted(tenant.email, updatedBooking);
  io.emit("bookingCompleted", updatedBooking); // Phát sự kiện cho tất cả client
}
