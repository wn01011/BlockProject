import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlockTransactionComponent = ({ txs, blockId }) => {
  const dark = useSelector((state) => state.util.dark);

  return (
    <Box dark={dark}>
      <TxsBox>
        <TitleBox>
          BlockNumber:{" "}
          <span>
            <Link to={`/latestBlock/${blockId}`}>#{blockId}</Link>
          </span>
        </TitleBox>
        {txs.map((item, index) => {
          return (
            <TxsDiv key={`tx-${index}`}>
              <div className="indexBox">{index}</div>
              <div>
                <div>
                  <span>Hash: </span>
                  <span>
                    <Link to={`/latestTransaction/${item.hash}`}>
                      {item.hash}
                    </Link>
                  </span>
                </div>
                <div>
                  <span>Nonce: </span>
                  <span>{item.nonce}</span>
                </div>
                <div>
                  <span>From: </span>
                  <span>
                    <Link to={`/address/${item.from}`}>{item.from}</Link>
                  </span>
                </div>
                <div>
                  <span>To: </span>
                  <span>
                    <Link to={`/address/${item.to}`}>{item.to}</Link>
                  </span>
                </div>
              </div>
            </TxsDiv>
          );
        })}
      </TxsBox>
    </Box>
  );
};

export default BlockTransactionComponent;

const Box = styled.div`
  width: 86%;
  padding: 0 7%;
  display: flex;
  border-top: 1px solid grey;
  background-color: ${({ dark }) => {
    if (dark) return "#0c0c0cf0";
    else return "white";
  }};
  color: ${({ dark }) => {
    if (dark) return "#f0f0f0";
    else return "#0c0c0cf0";
  }};
`;

const TxsBox = styled.div`
  margin: 50px auto;
  width: 95%;
  border: 1px solid grey;
  border-radius: 12px;
  .indexBox {
    width: 50px;
    text-align: center;
    padding: 20px 20px 20px 0px;
    border-right: 1px solid grey;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TxsDiv = styled.div`
  width: 90%;
  margin: auto;
  border-bottom: 1px solid grey;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  column-gap: 50px;
`;

const TitleBox = styled.div`
  width: 90%;
  margin: auto;
  font-size: 1.2rem;
  border-bottom: 1px solid grey;
  padding: 10px 20px;
  & > span {
    color: grey;
  }
`;
