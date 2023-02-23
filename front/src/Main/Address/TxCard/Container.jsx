import TxCardComponent from "./Component";

const TxCardContainer = ({ title, txs, dark }) => {
  return (
    <TxCardComponent title={title} txs={txs} dark={dark}></TxCardComponent>
  );
};

export default TxCardContainer;
