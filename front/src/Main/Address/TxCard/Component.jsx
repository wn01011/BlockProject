import styled from "styled-components";
import { getTimeFunc, weiToEther, sliceText } from "../../../utils";
import { Link } from "react-router-dom";

const TxCardComponent = ({ title, txs, dark }) => {
  const returnBox = () => {
    return txs.length ? (
      <Box dark={dark}>
        <TitleBox>{title}</TitleBox>
        <hr />
        <SubTitleBox>
          <div>Txn Hash</div>
          <div>Block</div>
          <div>Age</div>
          <div>From</div>
          <div>To</div>
          <div>Value</div>
        </SubTitleBox>
        <hr />
        <DataBox>
          {txs.map((item, index) => {
            const timestamp = getTimeFunc(item.BlockTable.timestamp);
            return (
              <div key={`${title}-${index}`} className={"tx"}>
                <div>
                  <Link to={`/latestTransaction/${item.hash}`}>
                    {sliceText(item.hash)}
                  </Link>
                </div>
                <div>{item.blockNumber}</div>
                <div>{timestamp.text}</div>
                <div>
                  <Link to={`/address/${item.from}`}>
                    {sliceText(item.from)}
                  </Link>
                </div>
                <div>
                  <Link to={`/address/${item.to}`}>{sliceText(item.to)}</Link>
                </div>
                <div>{weiToEther(item.value)} Ether</div>
              </div>
            );
          })}
        </DataBox>
      </Box>
    ) : (
      <></>
    );
  };

  return returnBox();
};

export default TxCardComponent;

const Box = styled.div`
  width: 86%;
  padding: 50px 7%;
  border-radius: 5px;
  border: 1px solid grey;
  color: ${({ dark }) => {
    if (dark) return "#f0f0f0";
    else return "#0c0c0cf0";
  }};
  margin-bottom: 50px;
`;

const TitleBox = styled.div`
  width: 100%;
  font-size: 2rem;
`;

const DataBox = styled.div`
  width: 100%;
  padding: 5px 0px;

  .tx {
    display: flex;
    justify-content: space-between;
    column-gap: 2%;
    padding: 5px 0px;

    & > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > div:nth-child(1) {
      width: 20%;
    }
    & > div:nth-child(2) {
      width: 5%;
    }
    & > div:nth-child(3) {
      width: 10%;
    }
    & > div:nth-child(4) {
      width: 20%;
    }
    & > div:nth-child(5) {
      width: 20%;
    }
    & > div:nth-child(6) {
      width: 15%;
    }
  }
`;

const SubTitleBox = styled.div`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  column-gap: 2%;

  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div:nth-child(1) {
    width: 20%;
  }
  & > div:nth-child(2) {
    width: 5%;
  }
  & > div:nth-child(3) {
    width: 10%;
  }
  & > div:nth-child(4) {
    width: 20%;
  }
  & > div:nth-child(5) {
    width: 20%;
  }
  & > div:nth-child(6) {
    width: 15%;
  }
`;
