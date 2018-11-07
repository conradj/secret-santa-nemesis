const sgMail = require("@sendgrid/mail");

const sendEmails = async messages => {
  let results = [];
  for (const message of messages) {
    const result = await sendEmail(message);
    console.log(result);
    results.push(result);
  }
  //await messages.forEach(async message => await sendEmail(message));
};

const sendEmail = msg => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail
    .send(msg)
    .then(() => {
      //Celebrate
      return { result: "ok", message: msg };
    })
    .catch(error => {
      //Log friendly error
      console.error(error.toString());

      //Extract error msg
      const { message, code, response } = error;

      //Extract response msg
      const { headers, body } = response;
      return { result: "error", message: message };
    });
};

module.exports = sendEmails;
