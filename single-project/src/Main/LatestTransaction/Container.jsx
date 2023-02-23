import LatestTransactionComponent from "./Component";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimeFunc } from "../../utils";
import axios from "axios";

const LatestTransactionContainer = () => {
  const { txHash } = useParams();
  const [transaction, setTransaction] = useState({});
  const [timestamp, setTimestamp] = useState({});

  useEffect(() => {
    axios.post("/api/web3/getTx", { hash: txHash }).then(({ data }) => {
      setTransaction(data);
    });
    axios
      .post("/api/web3/getBlockTimestampFromTxHash", { hash: txHash })
      .then(({ data }) => {
        setTimestamp(getTimeFunc(data.timestamp));
      });
  }, []);

  return (
    <LatestTransactionComponent
      transaction={transaction}
      timestamp={timestamp}
    ></LatestTransactionComponent>
  );
};

export default LatestTransactionContainer;
