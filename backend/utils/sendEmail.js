const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
          user: process.env.SMPT_USER,
          pass: process.env.SMPT_PASS
        }
      });
    
    const message = {
        from: `${process.env.SMPT_NAME}<${process.env.FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
}

module.exports = sendEmail;