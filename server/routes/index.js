const { Router } = require("express");

const router = Router();
const web3 = require("./web3.js");

router.post("/", (req, res) => {
  res.send("server connect");
});

router.use("/web3", web3);

module.exports = router;
