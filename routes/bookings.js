import express from "express";
import Bookings from "../models/bookings.js";
import BookingController from "../controllers/bookings.js";
import bookingDetail from "../models/bookingDetails.js";
import Spaces from "../models/spaces.js";


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
bookingRouter.get("/bookingByUserId/:id", BookingController.getListBookingOfUser);



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


// api lấy 3 spaces có lượt book nhiều nhất theo quantity
bookingRouter.get("/top-spaces", async (req, res) => {
  try {
    const result = await bookingDetail.aggregate([
      {
        //Gom nhóm các order item theo productId và tính tổng số lượng của từng sp
        $group: {
          _id: "$spaceId",
          quantity: { $sum: "$quantity" },
          latestCreatedAt: { $max: "$createdAt" },
        },
      },
      // {
      //   $match: { quantity: { $gt: 0 } }, // Lọc sản phẩm có quantity > 0
      // },
      {
        $sort: { quantity: -1, latestCreatedAt: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No space found" });
    }

    // Lấy thông tin chi tiết của các sản phẩm bán chạy nhất
    const topSpaces = await Spaces.find({
      _id: { $in: result.map((item) => item._id) },
    });

    // Gộp thông tin chi tiết với số lượng sản phẩm đã bán
    const topSpaceWithQuantity = topSpaces.map((s) => {
      const quantitySold = result.find((item) =>
        item._id.equals(s._id)
      ).quantity;
      // const totalPrice = s.price * quantitySold;
      return {
        // trả về đối tượng js với các thuộc tính của sp như id, name, price ...
        ...s.toObject(),
        quantity: quantitySold,
        // totalPrice: totalPrice,
      };
    });

    // sắp xếp sản phẩm bán nhiều nhất lên đầu
    topSpaceWithQuantity.sort((a, b) => b.quantity - a.quantity);

    return res.status(200).json(topSpaceWithQuantity);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error retrieving the top products" });
  }
});

export default bookingRouter  