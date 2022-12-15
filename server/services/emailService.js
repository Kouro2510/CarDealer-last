require('dotenv').config();
const nodemailer = require('nodemailer');

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Thanh Hoa" <thanhphuong25102010@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: 'Thông tin đặt lịch mua bán xư', // Subject line
        html: getBodyHtmlEmail(dataSend),
    });
};
let getBodyHtmlEmail = (dataSend) => {
    let result = '';
    if (dataSend) {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch mua xe online ở hệ thống của chúng tui</p>
        <p>Thông tin đặt lịch </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Loại xe: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch thời gian hóa đơn tồn tại trong vòng 24h.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cảm ơn</div>
    `;
    }

    return result;
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
};
