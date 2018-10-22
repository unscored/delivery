const nodemailer = require('nodemailer');
const {mail} = require('../config');

function Mail() {
  this.transporter = nodemailer.createTransport(mail);
}

/**
 * send message to user
 *
 */
Mail.prototype.send = function() {
  const mailOptions = {
    from: '"Fred Foo 👻" <crewcoast@gmail.com>',
    to: 'ivantsov.s88@gmail.com',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  };

  this.transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

const mailBox = new Mail();

module.exports = {
  mailBox
};
