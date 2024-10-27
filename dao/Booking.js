import Booking from "../models/bookings.js";

class BookingDAO {
  static async getBookingsBySpaceAndDates(spaceId, dates, rentalType) {
    try {
      const bookings = [];

      for (const date of dates) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
          throw new Error(`Invalid date format: ${date}`);
        }

        const startOfDay = new Date(parsedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(parsedDate);
        endOfDay.setHours(23, 59, 59, 999);

        let dayBookings;

        // Phân biệt logic dựa trên rentalType
        if (rentalType === 'hour' || rentalType === 'day') {
          // Với loại thuê theo giờ hoặc ngày, kiểm tra từng slot cụ thể trong ngày
          dayBookings = await Booking.find({
            spaceId,
            'selectedSlots.date': { $gte: startOfDay, $lte: endOfDay }
          });
        } else if (rentalType === 'week' || rentalType === 'month') {
          // Với loại thuê theo tuần hoặc tháng, kiểm tra khoảng thời gian từ startDate đến endDate
          dayBookings = await Booking.find({
            spaceId,
            startDate: { $lte: endOfDay },
            endDate: { $gte: startOfDay }
          });
        }

        bookings.push(...dayBookings);
      }

      return bookings;
    } catch (error) {
      throw new Error('Error fetching bookings by space and date: ' + error.message);
    }
  }


  static async getBookingsByUser(userId) {
    try {
      return await Booking.find({ userId });
    } catch (error) {
      throw new Error('Error retrieving bookings: ' + error.message);
    }
  }

  // Các phương thức DAO khác có thể thêm vào đây, ví dụ: cập nhật, xoá booking

  static async fetchListBookingOfUser(id) {  
      try {
      const orders = await Booking.find({ userId: id })
        .populate({
          path: "items",
          populate: {
            path: "spaceId",
            model: "spaces",
          },
        })
        .exec();
      return orders;
    } catch (error) {
      throw new Error(error.toString());
    }
  };
}



export default BookingDAO;
