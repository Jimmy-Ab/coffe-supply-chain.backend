const nodeMailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text

    }

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.error(err);
        }
        else{
            console.log(info);
        }
    })
}

module.exports = sendEmail;