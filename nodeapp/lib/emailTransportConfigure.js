const nodemailer = require('nodemailer');

module.exports = async function() {

  // entorno desarrollo
  const testAccount = await nodemailer.createTestAccount();

  const developmetTransport = {
    host: testAccount.smtp.host, //'smtp.ethereal.email',
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
  }

  const transport = nodemailer.createTransport(developmetTransport);

  return transport;
}