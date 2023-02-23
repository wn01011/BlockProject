const { Router } = require("express");

const router1 = Router();
const { router } = require("./web3.js");

router1.post("/", (req, res) => {
  res.send("server connect");
});

router1.use("/web3", router);

module.exports = router1;
