const sgMail = require("@sendgrid/mail");

const sendEmails = async messages => {
  let results = [];
  for (const message of messages) {
    const result = await sendEmail(message);
    results.push(result);
  }
  return results;
};

const sendEmail = async msg => {
  let result = { result: "begin", message: "not started" };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const response = await sgMail.send(msg);
    result = { result: "ok", to: msg.to };
  } catch (error) {
    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const { message, code, response } = error;

    //Extract response msg
    const { headers, body } = response;
    result = { result: "error", message: message };
  }
  console.log(result);
  return result;
};

module.exports = sendEmails;
