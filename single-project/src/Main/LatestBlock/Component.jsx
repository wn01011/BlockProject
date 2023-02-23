import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LatestBlockComponent = ({
  block,
  blockId,
  txLen,
  timestamp,
  maxHeight,
}) => {
  const navigate = useNavigate();
  const dark = useSelector((state) => state.util.dark);

  return (
    <BlockBox dark={dark}>
      <TitleBox>
        Block <span>#{blockId}</span>
        <div className="btnBox">
          <div
            onClick={() => {
              if (+blockId > 0) navigate(`/latestBlock/${+blockId - 1}`);
            }}
          >
            {"<"}
          </div>
          <div
            onClick={() => {
              if (+blockId >= 0 && +blockId + 1 < +maxHeight)
                navigate(`/latestBlock/${+blockId + 1}`);
            }}
          >
            {">"}
          </div>
        </div>
      </TitleBox>
      <DataBox>
        <div>
          <span>Block Height:</span>
          <span>{blockId}</span>
        </div>
        <div>
          <span>TimeStamp:</span>
          <span>{timestamp.text}</span>
        </div>

        <div>
          <span>Transactions:</span>
          {txLen == 0 ? (
            <span>{txLen} transactions</span>
          ) : (
            <span>
              <Link to={`/latestBlock/${blockId}/transactions`}>
                {txLen} transactions
              </Link>
            </span>
          )}
        </div>
        <hr />
        <div>
          <span>Fee Recipient:</span>
          <span>
            <Link to={`/address/${block.miner}`}>{block.miner}</Link>
          </span>
        </div>
        <div>
          <span>Block Reward:</span>
          <span>{blockId}</span>
        </div>
        <div>
          <span>Total Difficulty:</span>
          <span>{block.totalDifficulty}</span>
        </div>
        <div>
          <span>Size:</span>
          <span>{block.size} bytes</span>
        </div>
        <hr />
        <div>
          <span>Gas Used:</span>
          <span>
            {block.gasUsed}(
            {parseInt(block.gasUsed * 10000) / block.gasLimit / 100}%)
          </span>
        </div>
        <div>
          <span>Gas Limit:</span>
          <span>{block.gasLimit}</span>
        </div>
        <div>
          <span>Extra Data:</span>
          <span>{block.extraData}</span>
        </div>
      </DataBox>
    </BlockBox>
  );
};

export default LatestBlockComponent;

const BlockBox = styled.div`
  border-top: grey 1px solid;
  width: 86%;
  padding: 0 7%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-bottom: 20px;
  background-color: ${({ dark }) => {
    if (dark) return "#0c0c0cf0";
    else return "white";
  }};
  color: ${({ dark }) => {
    if (dark) return "#f0f0f0";
    else return "#0c0c0cf0";
  }};
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  column-gap: 5px;
  & > span {
    color: grey;
  }
  .btnBox {
    display: flex;
    column-gap: 15px;
    font-size: 2rem;
    margin-left: 50px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 35px;
      height: 35px;
      border-radius: 12px;
      background-color: grey;
      color: #f0f0f0;
    }
    div:hover {
      background-color: yellowgreen;
    }
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
