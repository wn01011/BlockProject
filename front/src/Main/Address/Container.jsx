import AddressComponent from "./Component";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { weiToEther } from "../../utils";
import axios from "axios";

const AddressContainer = () => {
  const { address: address } = useParams();
  const [balance, setBalance] = useState(0);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

  useEffect(() => {
    getTransactions();
    getWallet();
  }, [address]);

  async function getWallet() {
    axios
      .post("/api/web3/getWallet", { address })
      .then(({ data: { balance } }) => {
        setBalance(weiToEther(balance));
      })
      .catch((error) => {
        console.error("getAddress Error");
      });
  }

  async function getTransactions() {
    axios
      .post("/api/web3/getTransactionsByFromAndTo", { address })
      .then(({ data: { from, to } }) => {
        setFrom(from);
        setTo(to);
      });
  }

  return (
    <AddressComponent
      address={address}
      balance={balance}
      from={from}
      to={to}
    ></AddressComponent>
  );
};

export default AddressContainer;
