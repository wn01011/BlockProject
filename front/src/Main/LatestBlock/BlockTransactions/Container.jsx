import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlockTransactionComponent from "./Component";

const BlockTransactionContainer = () => {
  const { blockId } = useParams();
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    try {
      axios
        .post("/api/web3/getBlockByBlockNumber", { blockNumber: blockId })
        .then(({ data: { TransactionTables: txs } }) => {
          setTxs(txs);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <BlockTransactionComponent
      txs={txs}
      blockId={blockId}
    ></BlockTransactionComponent>
  );
};

export default BlockTransactionContainer;
