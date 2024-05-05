const nodemailer = require('nodemailer');
async function sendMail(to, subject, text = null, html = null) { 
    try {
        // SMTP sunucu ayarları
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // E-posta gönderme ayarları
        let info = await transporter.sendMail({
            from: '"Benovshe Maharramova" benovshee03@gmail.com',
            to: to,  // Gönderilecek kişi
            subject: subject, // E-posta konusu
            text: text, // E-posta içeriği (text formatı)
            html: html // E-posta içeriği (html formatı)
        });

        console.log("Mail has sent: %s", info.messageId);
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = sendMail;