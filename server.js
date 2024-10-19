import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { json } from "express"; // Import json từ express
import connectDB from "./database.js";
import {
  userRouter,
  spaceRouter,
  rulesRouter,
  categoriesRouter,
  reviewRouter,
  cartRouter,
  bookingRouter,
  bankRouter,
  bankAccountRouter,
  appliancesRouter,
  reportRouter,
  reasonsRouter,
  messageRouter,
  userNeedRouter,
  chatRouter,
  messRouter,
} from "./routes/index.js";
import { Server } from "socket.io"; // Import socket.io
import { createServer } from "http"; // Import createServer cho việc khởi tạo HTTP server

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API</h1>");
});

// Đăng ký các router
app.use("/reviews", reviewRouter);
app.use("/carts", cartRouter);
app.use("/users", userRouter);
app.use("/spaces", spaceRouter);
app.use("/rules", rulesRouter);
app.use("/categories", categoriesRouter);
app.use("/bookings", bookingRouter);
app.use("/bank", bankRouter);
app.use("/bankaccount", bankAccountRouter);
app.use("/appliances", appliancesRouter);
app.use("/reports", reportRouter);
app.use("/reasons", reasonsRouter);
app.use("/userNeed", userNeedRouter);
app.use("/chat", chatRouter);
app.use("/message", messRouter);

// Middleware để xử lý CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const Port = process.env.PORT || 9999;

// Tạo HTTP server từ Express app
const server = createServer(app);

// Thiết lập Socket.io sử dụng HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend từ localhost:3000
  },
});

let activeUsers = [];

// Thiết lập các sự kiện của Socket.io
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Khi có người dùng mới thêm vào
  socket.on("new-user-add", (newUserId) => {
    try {
      // Kiểm tra xem user đã tồn tại chưa
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      io.emit("get-users", activeUsers);
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  });

  // Khi người dùng ngắt kết nối
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
    console.log("User Disconnected", activeUsers);
  });

  // Khi nhận được yêu cầu gửi tin nhắn
  socket.on("send-message", (data) => {
    try {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to:", receiverId);
      console.log("Data:", data);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
});

// Bắt đầu server và kết nối với cơ sở dữ liệu
server.listen(Port, async () => {
  try {
    await connectDB();
    console.log(`Web server running on http://localhost:${Port}`);
  } catch (error) {
    console.error("Database connection failed", error);
  }
});
