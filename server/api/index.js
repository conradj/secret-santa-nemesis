const express = require("express");
const router = express.Router();
const allocateSantas = require("../allocateSantas");
const sendEmails = require("../sendGrid");

router.post("/send", (req, res) => {
  const { santaList } = req.body;
  const santaAllocationResult = allocateSantas(santaList);

  const getEmail = santaName => {
    const santa = santaList.find(({ name }) => santaName === name);
    return santa.email;
  };
  if (santaAllocationResult instanceof Error) {
    // handle the error safely
    console.warn("🎅 Allocation Error 🦌", santaAllocationResult);
    res.json({ error: "🎅 Allocation Error 🦌" });
  } else {
    const messages = santaAllocationResult.map(({ from, to }) => ({
      to: getEmail(from),
      from: "donotreply@conradj.co.uk",
      subject: "2018 secret santa message 🛷 from the elves - TAKE 2",
      text: `🎅 Ho ho ho! Merry Christmas ${from}! 🎅 \n\nSomeone has been chosen to get you a gift; and *you* have been chosen to gift ${to}!\n\nFor Christmas Extravaganza 2018, we've set a budget of £50 💰\n\nRemember to wrap your present 🎁 in a way that no-one can guess who it is from and sneak it under the tree 🎄 when you get to your hosts 👨‍👩‍👧\n\nSecret 🕵️‍♂️ Santa 🎅 is more fun if you can keep it a complete secret, so do your best! 🍾 \n\nLots of love, the elves 🧝🧝‍🧝‍ xxx`,
      html: `<p>🎅 Ho ho ho! Merry Christmas ${from}! 🎅 </p><p>Someone has been chosen to get you a gift; and *you* have been chosen to gift <strong>${to}</strong>!</p><p>For Christmas Extravaganza 2018, we've set a budget of £50 💰</p><p>Remember to wrap your present 🎁 in a way that no-one can guess who it is from and sneak it under the tree 🎄 when you get to your hosts 👨‍👩‍👧\</p><p>Secret 🕵️‍♂️ Santa 🎅 is more fun if you can keep it a complete secret, so do your best! 🍾 </p><p>Lots of love, the elves 🧝🧝‍🧝‍ xxx</p>`
    }));
    const emailResults = sendEmails(messages);
    const encodedResults = santaAllocationResult.map(({ from, to }) => ({
      from,
      to: Buffer.from(to).toString("base64")
    }));
    res.json({ emailResults, encodedResults });
  }
});
module.exports = router;
