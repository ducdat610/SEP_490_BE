import express from "express";
import Bookings from "../models/bookings.js";
import BookingController from "../controllers/bookings.js";


const bookingRouter = express.Router();

bookingRouter.get

//list danh sách booking
bookingRouter.get("/", async (req, res, next) => {
  try {
    const bookings = await Bookings.find({})
      .populate("spaceId")
      .populate("userId")
      .exec();
    if (bookings.length === 0) {
      throw createError(404, "Không tìm thấy dịch vụ");
    }
    res.send(bookings);
  } catch (error) {
    next(error);
  }
});

// Endpoint kiểm tra khung giờ khả dụng
bookingRouter.post('/check-hour-availability', BookingController.checkHourAvailability);
bookingRouter.post('/check-day-availability', BookingController.checkDayAvailability);

// Endpoint để tạo đặt phòng mới
bookingRouter.post('/create', BookingController.createBooking);



// Cập nhật trạng thái booking và lý do nếu chuyển thành 'cancel' api cho user
bookingRouter.put("/update-status/:id", async (req, res, next) => {
  try {
    const { status, cancelReason } = req.body; // Ensure the naming is consistent with the schema
    if (status !== "completed" && status !== "canceled") {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedBooking = await Bookings.findByIdAndUpdate(
      req.params.id,
      { status, cancelReason: status === "canceled" ? cancelReason : undefined }, // Cập nhật cancelReason chỉ khi status là "canceled"
      { new: true }
    ).populate("userId");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }
    // Nếu trạng thái là "completed", gửi email

    if (status === "completed") {
      const tenantEmail = updatedBooking.userId.gmail; // Giả sử bạn có trường email trong user
      console.log(tenantEmail);

      await sendEmailBookingCompleted.sendEmailBookingCompleted(tenantEmail, updatedBooking);
    }

    res.json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

export default bookingRouter  