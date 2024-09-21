import nodemailer from 'nodemailer';

const sendEmailBookingCompleted = async (tenantEmail, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Hoặc dịch vụ email bạn sử dụng
    auth: {
      user: "toan20022222@gmail.com", // Địa chỉ email của bạn
      pass: "umpw zlcp eujr njwp", // Mật khẩu email
    },
  });

  const mailOptions = {
    from: "toan20022222@gmail.com",
    to: "phongop2k6@gmail.com",
    subject: 'Booking Confirmation',
    text: `Your booking is confirmed! Details: ${JSON.stringify(bookingDetails)}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default {sendEmailBookingCompleted};
