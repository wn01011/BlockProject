import MainComponent from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainContainer = () => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [page, setPage] = useState(0);
  const [txPage, setTxPage] = useState(0);
  const [pageLen, setPageLen] = useState(6);

  const [searchWord, setSearchWord] = useState("");

  const navigate = useNavigate();

  let btnLen = Math.floor(blockHeight / pageLen);
  let txBtnLen = Math.floor(transactionCount / pageLen);

  const pageOnClick = (_num) => {
    if (_num < 0 || _num > btnLen) return;
    setPage(_num);
  };

  const txPageOnClick = (_num) => {
    if (_num < 0 || _num > txBtnLen) return;
    setTxPage(_num);
  };

  const searchFunc = async (searchWord) => {
    const curWord = searchWord.trim();
    if (curWord === "") return;
    const {
      data: { data, number, error },
    } = await axios.post("/api/web3/searchWord", {
      sWord: curWord,
    });
    switch (data) {
      case "blockNumber":
        navigate(`/latestBlock/${number}`);
        break;
      case "blockHash":
        navigate(`/latestBlock/${number}`);
        break;
      case "transactionHash":
        navigate(`/latestTransaction/${curWord}`);
        break;
      case "account":
        navigate(`/address/${curWord}`);
        break;
    }
    if (data) {
      setSearchWord("");
    } else {
      setSearchWord("somthing is wrong");
    }
  };

  useEffect(() => {
    setPage(btnLen - page + 1);
  }, [btnLen]);

  useEffect(() => {
    setTxPage(txBtnLen - txPage + 1);
  }, [txBtnLen]);

  useEffect(() => {
    btnLen = Math.floor(blockHeight / pageLen);
    txBtnLen = Math.floor(transactionCount / pageLen);
    setPage(btnLen);
    setTxPage(txBtnLen);
    getBlockNumber();
    getPagenationBlock();
    getPagenationTransactions();
    getTransactionCount();
  }, [pageLen]);

  function getBlockNumber() {
    axios.post("/api/web3/getBlockNumber").then(({ data }) => {
      setBlockHeight(data);
    });
  }

  function getPagenationBlock() {
    axios
      .post("/api/web3/getBlocks", { page, pageLen, btnLen })
      .then(({ data }) => {
        if (!data.error) setBlocks(data);
      });
  }

  function getPagenationTransactions() {
    axios
      .post("/api/web3/getTxs", { txPage, pageLen, txBtnLen })
      .then(({ data }) => {
        if (!data.error) setTransactions(data);
      });
  }

  function getTransactionCount() {
    axios.post("/api/web3/getTxCount").then(({ data: { count } }) => {
      setTransactionCount(count);
    });
  }

  useEffect(() => {
    getPagenationBlock();
  }, [page]);

  useEffect(() => {
    getPagenationTransactions();
  }, [txPage]);

  return (
    <MainComponent
      blocks={blocks}
      transactions={transactions}
      pageOnClick={pageOnClick}
      txPageOnClick={txPageOnClick}
      setPageLen={setPageLen}
      searchFunc={searchFunc}
      btnLen={btnLen}
      txBtnLen={txBtnLen}
      page={page}
      txPage={txPage}
      setSearchWord={setSearchWord}
      searchWord={searchWord}
    ></MainComponent>
  );
};

export default MainContainer;
