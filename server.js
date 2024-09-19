import cors from "cors";
import * as dotenv from "dotenv";
import express, { json } from "express";

import connectDB from "./database.js";
import {
  userRouter,
  spaceRouter,
  rulesRouter,
  categoriesRouter,
} from "./routes/index.js";

dotenv.config();
//Tạo 1 constant 'app'
const app = express();
//Thêm middleware kiểm soát dữ liệu của Request
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("<h1>Welcom to</h1>");
});
app.use("/users", userRouter);
app.use("/spaces", spaceRouter);
app.use("/rules", rulesRouter);
app.use("/categories", categoriesRouter);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const Port = process.env.PORT || 9999;

//Lắng nghe các request gửi tới web server tại port

app.listen(Port, async () => {
  connectDB();
  console.log(`web server running on http://localhost:${Port}`);
});
