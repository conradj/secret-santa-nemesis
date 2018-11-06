const express = require("express");
const router = express.Router();
const allocateSantas = require("./allocateSantas");

router.post("/send", (req, res) => {
  const { santaList } = req.body;
  const santaAllocationResult = allocateSantas(santaList);
  if (santaAllocationResult instanceof Error) {
    // handle the error safely
    console.warn("🎅 Allocation Error 🦌", santaAllocationResult);
    res.json({ error: "🎅 Allocation Error 🦌" });
  } else {
    // no error occured, continue on
    console.log(santaAllocationResult);
    res.json(santaAllocationResult);
  }
});
module.exports = router;
