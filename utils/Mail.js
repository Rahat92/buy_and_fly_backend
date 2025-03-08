const nodemailer = require('nodemailer');
// const pug = require('pug');
// const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, message) {
        this.to = user.email;
        this.name = user.name
        // this.url = url;
        this.user = user;
        this.message = message;
        this.from = `Kamrul Hasan Rahat <khrahat150@gmail.com>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: "64ec82eddcccb6",
                    pass: "fc69cfc7ae7684"
                }
            });
        }

        return nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "64ec82eddcccb6",
                pass: "fc69cfc7ae7684"
            }
        });
    }

    // Send the actual email
    async send(message, subject) {
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html:`<div>
                <h4>${message}</h4>
            </div>`,
            // text: message,
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }
    async sendPassword(){
        await this.send(this.message, "Your password!")
    }
    async sendPasswordReset() {
        await this.send(
            `<h4>Dear <span style = "font-weight:bold">${this.user.name}</span>. You can reset your password by entering this link- <a href = ${this.message}>Click to reset password</a></h4>`,
            'Your password reset token (valid for only 10 minutes)'
        );
    }
};
