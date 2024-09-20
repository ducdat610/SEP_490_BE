import express from "express";
import Bookings from "../models/bookings.js";

const bookingRouter = express.Router();

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

// tạo mới booking
bookingRouter.post("/", async (req, res, next) => {
  try {
    const {
      userId,
      spaceId,
      checkIn,
      checkOut,
      notes,
    } = req.body;

    // Check for required fields
    if (!userId || !spaceId || !checkIn || !checkOut ) {
      return res.status(400).json({ error: "Missing required fields" });
    }


    // Create a new booking
    const newBooking = new Bookings({
      userId,
      spaceId,
      checkIn,
      checkOut,
      notes,
      status: "awaiting payment", // Set default status
    });

    // Save the new booking
    const savedBooking = await newBooking.save();



    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
});



// Cập nhật trạng thái booking và lý do nếu chuyển thành 'cancel' api cho user
bookingRouter.put("/update-status/:id", async (req, res, next) => {
  try {
    const { cancelReason } = req.body; // Ensure the naming is consistent with the schema
    const updatedBooking = await Bookings.findByIdAndUpdate(
      req.params.id,
      { status: "canceled", cancelReason }, // Update status and cancelReason fields
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }

    res.json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

export default bookingRouter