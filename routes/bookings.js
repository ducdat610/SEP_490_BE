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


// Thêm booking mới

bookingRouter.post("/", async (req, res, next) => {
  try {
    const {
      userId,
      spaceId,
      checkIn,
      checkOut,
      notes,
      status,
      email,
      address,
      appointment_date,
      timeslotId,
      order_status,
      pet_info,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    const timeslot = await Timeslot.findById(timeslotId);
    if (!timeslot) {
      return res.status(400).json({ error: "Timeslot not found" });
    }
    if (timeslot.availableSlots <= 0) {
      return res
        .status(400)
        .json({ error: "No available slots for this timeslot" });
    }

    const newBooking = new Booking({
      userId,
      service_type,
      customer_name,
      phone_number,
      email,
      address,
      appointment_date,
      timeslot: timeslotId,
      order_status,
      pet_info,
    });

    const savedBooking = await newBooking.save();

    timeslot.availableSlots -= 1;
    await timeslot.save();

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