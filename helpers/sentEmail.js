
function sentEmail(email, token) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'fajrinpgrm@gmail.com',
    subject: 'Token from MD Media',
    text: `This is token from MD Media ${token}`,
    html: `<strong>This is token from MD Media ${token}</strong>`,
  };
  sgMail.send(msg);
  console.log('done')
}

module.exports = sentEmail