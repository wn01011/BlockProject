import LatestBlockComponent from "./Component";
// import { getBlock } from "../../Web3/web3";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimeFunc } from "../../utils";
import axios from "axios";

const LatestBlockContainer = () => {
  const { blockId } = useParams();
  const [block, setBlock] = useState({});
  const [txLen, setTxLen] = useState(0);
  const [timestamp, setTimestamp] = useState({});
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    axios
      .post("/api/web3/getBlockByBlockNumber", { blockNumber: blockId })
      .then(({ data }) => {
        setBlock(data);
        setTimestamp(getTimeFunc(data.timestamp));
      })
      .then(() => {
        // 해당 블록의 txLength를 찾는 요청
        axios
          .post("/api/web3/getTxLen", { blockNumber: blockId })
          .then(({ data }) => {
            setTxLen(data.length);
          });
      });

    axios.post("/api/web3/getBlockNumber").then(({ data }) => {
      setMaxHeight(data);
    });
  }, [blockId]);
  return (
    <>
      <LatestBlockComponent
        block={block}
        blockId={blockId}
        txLen={txLen}
        timestamp={timestamp}
        maxHeight={maxHeight}
      ></LatestBlockComponent>
    </>
  );
};

export default LatestBlockContainer;
