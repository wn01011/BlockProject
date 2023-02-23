import styled from "styled-components";
import { Link } from "react-router-dom";

const LatestTransactionComponent = ({ transaction, timestamp }) => {
  return (
    <TransactionBox>
      <TitleBox>Transaction Details</TitleBox>
      <DataBox>
        <div>
          <span>Transaction Hash:</span>
          <span>{transaction.hash}</span>
        </div>
        <div>
          <span>Block:</span>
          <span>
            <Link to={`/latestBlock/${transaction.blockNumber}`}>
              {transaction.blockNumber}
            </Link>
          </span>
        </div>
        <div>
          <span>Timestamp:</span>
          <span>{timestamp.text}</span>
        </div>
        <hr />
        <div>
          <span>From:</span>
          <span>
            <Link to={`/address/${transaction.from}`}>{transaction.from}</Link>
          </span>
        </div>
        <div>
          <span>To:</span>
          <span>
            <Link to={`/address/${transaction.to}`}>{transaction.to}</Link>
          </span>
        </div>
        <div>
          <span>Value:</span>
          <span>
            {Math.floor(Math.pow(10, -15) * transaction.value) / 1000} Eth
          </span>
        </div>
        <div>
          <span>Gas Price:</span>
          <span>
            {Math.floor(Math.pow(10, -9) * transaction.gasPrice)} Gwei
          </span>
        </div>
      </DataBox>
    </TransactionBox>
  );
};

export default LatestTransactionComponent;

const TransactionBox = styled.div`
  width: 86%;
  padding: 0 7%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 20px;
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid grey;
  & > span {
    color: grey;
  }
`;

const DataBox = styled.div`
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
  & > div {
    display: flex;
  }
  & > div > span {
    display: block;
    padding: 5px 10px;
  }
  & > div > span:first-child {
    width: 15%;
  }
  & > div > span:last-child {
    width: 80%;
  }
`;

const DetailBox = styled.div`
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
`;
