const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendVerificationEmail = async (email, verif_code) => {
    const emailTemplatePath = path.join(__dirname, 'verificationCode.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

    emailTemplate = emailTemplate.replace('{{verif_code}}', verif_code);

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Verification Code | No Reply',
        html: emailTemplate 
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
