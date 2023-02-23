const { Router } = require("express");
const Web3 = require("web3");
const webSocket = new Web3(
  new Web3.providers.WebsocketProvider("http://localhost:8085")
);
const BlockTable = require("../models/block");
const { TransactionTable } = require("../models");
const { Op } = require("sequelize");

const router = Router();

router.route("/getBlocks").post(async (req, res) => {
  let { page, pageLen, btnLen } = req.body;
  page = btnLen - page;
  try {
    const blocks = await BlockTable.findAll({
      order: [["number", "DESC"]],
      offset: page * pageLen,
      limit: pageLen,
    });
    res.send(blocks);
  } catch (error) {
    res.send({ error: error });
  }
});
router.route("/getBlocksAll").post(async (req, res) => {
  const blocks = await BlockTable.findAll();
  res.send(blocks);
});

router.route("/getBlockNumber").post(async (req, res) => {
  const blockHeight = await getBlockNumber();
  res.send(blockHeight.toString());
});

router.route("/getBlockByBlockNumber").post(async (req, res) => {
  const curBlock = await BlockTable.findOne({
    include: {
      model: TransactionTable,
      required: false,
    },
    where: {
      number: req.body.blockNumber,
    },
  });

  res.send(curBlock);
});

router.route("/getTx").post(async (req, res) => {
  const tx = await getTransaction(req.body.hash);
  res.send(tx);
});

router.route("/getBlockTimestampFromTxHash").post(async (req, res) => {
  const tx = await TransactionTable.findOne({
    where: {
      hash: req.body.hash,
    },
    include: {
      model: BlockTable,
      required: true,
    },
  });
  res.send({ timestamp: tx.BlockTable.timestamp });
});

router.route("/getTxCount").post(async (req, res) => {
  const { count } = await TransactionTable.findAndCountAll();
  res.send({ count: count });
});

router.route("/getTxs").post(async (req, res) => {
  try {
    let { txPage, pageLen, txBtnLen } = req.body;
    txPage = txBtnLen - txPage;
    const txs = await getTransactions(txPage, pageLen);
    res.send(txs);
  } catch (error) {
    res.send({ error: error });
  }
});

router.route("/getTxLen").post(async (req, res) => {
  const len = await TransactionTable.findAll({
    include: [
      {
        model: BlockTable,
        required: true,
        where: {
          number: req.body.blockNumber,
        },
      },
    ],
  });
  res.send(len);
});

router.route("/getTxIdFromTxHash").post(async (req, res) => {
  // const tx =
});

router.route("/getWallet").post(async (req, res) => {
  const curWallet = await webSocket.eth.getBalance(req.body.address);
  res.send({ balance: curWallet });
});

router.route("/getBlockTableCount").post(async (req, res) => {
  const count = await getBlockTableCount();
  res.send(+count);
});

router.route("/getTransactionsByFromAndTo").post(async (req, res) => {
  const fromAndTo = await getTransactionsByFromAndTo(req.body.address);
  res.send(fromAndTo);
});

router.route("/searchWord").post(async (req, res) => {
  try {
    const blockNumber = await BlockTable.findOne({
      where: {
        number: +req.body.sWord,
      },
    });
    if (blockNumber)
      return res.send({ data: "blockNumber", number: blockNumber.number });
    const blockHash = await BlockTable.findOne({
      where: {
        hash: req.body.sWord,
      },
    });
    if (blockHash)
      return res.send({ data: "blockHash", number: blockHash.number });
    const transactionHash = await TransactionTable.findOne({
      where: {
        hash: req.body.sWord,
      },
    });
    if (transactionHash) return res.send({ data: "transactionHash" });
    const account = await TransactionTable.findOne({
      where: {
        [Op.or]: [{ to: req.body.sWord }, { from: req.body.sWord }],
      },
    });
    if (account) return res.send({ data: "account" });

    res.send({ error: "data not found" });
  } catch (error) {
    res.send({ error: error });
  }
});

async function getBlock(_blockNum) {
  const curBlock = await webSocket.eth.getBlock(_blockNum);
  return curBlock;
}

async function getBlockNumber() {
  const blockNumber = await webSocket.eth.getBlockNumber();
  return blockNumber;
}

async function getBlockTableCount() {
  const blockNumber = await BlockTable.count();
  return { count: blockNumber };
}

async function getTransactionNumber(_blockNumber) {
  const transactionNumber = await webSocket.eth.getBlockTransactionCount(
    _blockNumber
  );
  return transactionNumber;
}

async function getTransaction(_hash) {
  const transaction = await webSocket.eth.getTransaction(_hash);
  return transaction;
}

async function getTransactions(page, pageLen) {
  const transactions = await TransactionTable.findAll({
    // attributes: ["transaction_index", "block_number"],
    order: [
      ["block_number", "DESC"],
      ["transaction_index", "DESC"],
    ],
    offset: page * pageLen,
    limit: pageLen,
  });
  return transactions;
}

async function getTransactionsByFromAndTo(_address) {
  const fromTxs = await TransactionTable.findAll({
    where: {
      from: _address,
    },
    include: {
      model: BlockTable,
      required: true,
    },
  });
  const toTxs = await TransactionTable.findAll({
    where: {
      to: _address,
    },
    include: {
      model: BlockTable,
      required: true,
    },
  });

  return { from: fromTxs, to: toTxs };
}

async function AddBlockToDB({
  number,
  hash,
  parentHash,
  baseFeePerGas,
  nonce,
  sha3Uncles,
  logsBloom,
  transactionsRoot,
  stateRoot,
  miner,
  difficulty,
  totalDifficulty,
  extraData,
  size,
  gasLimit,
  gasUsed,
  timestamp,
  transactions,
}) {
  const curBlockData = await BlockTable.create({
    number,
    hash,
    parentHash,
    baseFeePerGas,
    nonce,
    sha3Uncles,
    logsBloom,
    transactionsRoot,
    stateRoot,
    miner,
    difficulty,
    totalDifficulty,
    extraData,
    size,
    gasLimit,
    gasUsed,
    timestamp,
  });
  if (transactions.length !== 0) {
    transactions.forEach(async (item) => {
      const tx = await getTransaction(item);
      const curTxData = await TransactionTable.create({
        hash: tx.hash,
        blockHash: tx.blockHash,
        chainId: tx.chainId,
        from: tx.from,
        to: tx.to,
        gas: tx.gas,
        gasPrice: tx.gasPrice,
        input: tx.input,
        nonce: tx.nonce,
        r: tx.r,
        s: tx.s,
        v: tx.v,
        transactionIndex: tx.transactionIndex,
        type: tx.type,
        value: tx.value,
      });
      curBlockData.addTransactionTable(curTxData);
    });
  }
}

webSocket.eth
  .subscribe("newBlockHeaders", (error, result) => {
    if (!error) {
      return result;
    }
    console.error(error);
  })
  .on("data", async (blockHeader) => {
    const curBlock = await getBlock(blockHeader.number);
    AddBlockToDB({
      ...curBlock,
    });
  });

async function BlockSetting() {
  const blockNumber = await getBlockNumber();
  const dbBlockNumber = await getBlockTableCount();
  if (dbBlockNumber != 0) return;

  const blockArray = [];
  for (let i = 0; i < blockNumber; ++i) {
    const curBlock = await getBlock(i);
    blockArray[i] = curBlock;
    AddBlockToDB({
      ...curBlock,
    });
  }
}

BlockSetting();

module.exports = router;
