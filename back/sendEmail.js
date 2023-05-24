import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
    auth: {
      user: 'mtar287@gmail.com',
      pass: '09884637'
    }
  });
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'mtar287@gmail.com',
    subject: 'Test email from Node.js',
    text: 'Hello, this is a test email sent from Node.js'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  