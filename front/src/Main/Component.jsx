import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTimeFunc } from "../utils";
import { useSelector } from "react-redux";

const MainComponent = ({
  blocks,
  pageOnClick,
  btnLen,
  transactions,
  txPageOnClick,
  searchFunc,
  txBtnLen,
  page,
  txPage,
  searchWord,
  setSearchWord,
  setPageLen,
}) => {
  const dark = useSelector((state) => state.util.dark);

  return (
    <MainBox dark={dark}>
      <SearchBox className={dark ? "dark" : ""}>
        <div className="searchInputBox">
          <input
            type="text"
            placeholder="Search by Address / Txn Hash / Block"
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <div
            onClick={() => {
              searchFunc(searchWord);
            }}
          >
            <img
              src={dark ? "/img/ethereum-original.svg" : "/img/sun.png"}
              alt=""
            />
          </div>
        </div>
        <div className="future">Ether is The Future</div>
      </SearchBox>
      <ViewCountBox>
        <select
          id={"viewCount"}
          onChange={(e) => {
            setPageLen(+e.target.value);
          }}
        >
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </ViewCountBox>
      <DataBox>
        <LatestBlockBox className={dark ? "dark" : ""}>
          {blocks.map((item, index) => {
            const txLen =
              item.transactions && item.transactions !== "[]"
                ? item.transactions?.split(",").length
                : 0;
            return (
              <div key={`${(item, index)}`} className={"block"}>
                <div className={"left"}>
                  <div className={"imgBox"}>
                    <img src="/img/block.png" alt="blockImg" />
                  </div>
                  <div>
                    <span>
                      <Link to={`/latestBlock/${item.number}`}>
                        # {item.number}
                      </Link>
                    </span>
                    <span>{getTimeFunc(item.timestamp).text}</span>
                  </div>
                </div>
                <div className={"middle"}>
                  <span>
                    Fee Recipient{" "}
                    <Link to={`/address/${item.miner}`}>{item.miner}</Link>
                  </span>
                  <span>{txLen} txns</span>
                </div>
                <div className={"right"}>
                  <span>{item.gasUsed} GWEI</span>
                </div>
              </div>
            );
          })}
          <div className="pageBox">
            <span
              className="arrow"
              onClick={() => {
                pageOnClick(page + 1);
              }}
            >
              {"<"}
            </span>
            <span>{btnLen - page + 1}</span>
            <span
              className="arrow"
              onClick={() => {
                pageOnClick(page - 1);
              }}
            >
              {">"}
            </span>
          </div>
          <div className="pageInputBox">
            <input
              type="number"
              min={1}
              max={btnLen + 1}
              placeholder={`1-${btnLen + 1} pages`}
              onChange={(e) => {
                pageOnClick(btnLen - e.target.value + 1);
              }}
            />
          </div>
        </LatestBlockBox>
        <LatestTransactionBox className={dark ? "dark" : ""}>
          {transactions.map((item, index) => {
            return (
              <div key={`${(item, index)}`} className={"tx"}>
                <div className={"left"}>
                  <div className="imgBox">
                    <img src="/img/tx.png" alt="blockImg" />
                  </div>
                  <div>
                    <span>
                      <Link to={`/latestTransaction/${item.hash}`}>
                        {item.hash}
                      </Link>
                    </span>
                    <span></span>
                  </div>
                </div>
                <div className={"middle"}>
                  <span>
                    <Link to={`/address/${item.from}`}>from : {item.from}</Link>
                  </span>
                  <span>
                    <Link to={`/address/${item.to}`}>to : {item.to}</Link>
                  </span>
                </div>
                <div className={"right"}>
                  <span>
                    {Math.floor(Math.pow(10, -15) * item.value) / 1000} Eth
                  </span>
                </div>
              </div>
            );
          })}
          <div className="pageBox">
            <span
              className="arrow"
              onClick={() => {
                txPageOnClick(txPage + 1);
              }}
            >
              {"<"}
            </span>
            <span>{txBtnLen - txPage + 1}</span>
            <span
              className="arrow"
              onClick={() => {
                txPageOnClick(txPage - 1);
              }}
            >
              {">"}
            </span>
          </div>
          <div className="pageInputBox">
            <input
              type="number"
              min={1}
              max={txBtnLen + 1}
              placeholder={`1-${txBtnLen + 1} pages`}
              onChange={(e) => {
                txPageOnClick(txBtnLen - e.target.value + 1);
              }}
            />
          </div>
        </LatestTransactionBox>
      </DataBox>
    </MainBox>
  );
};

export default MainComponent;

const MainBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ dark }) => {
    if (dark) return "#0c0c0cf0";
    else return "#f0f0f00f";
  }};
  row-gap: 20px;
  &::before {
    content: "";
    background-image: url("/img/contourLine.jpg");
    background-repeat: none;
    filter: ${({ dark }) => {
      if (!dark)
        return "invert(24%) sepia(44%) saturate(3508%) hue-rotate(212deg) brightness(53%) contrast(86%)";
      else
        return "filter: invert(97%) sepia(61%) saturate(141%) hue-rotate(274deg) brightness(111%) contrast(73%)";
    }};
    position: absolute;
    top: 0;
    color: #2850bd;
    width: 100%;
    height: 50vh;
    z-index: -1;
  }
  .imgBox {
    padding: 5px;
    background-color: ${({ dark }) => {
      if (dark) return "#302f2f";
      else return "transparent";
    }};
    border: 2px solid #c2c2c2;
    border-radius: 10px;
  }
  .pageBox {
    font-size: 1.2rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    column-gap: 50px;
  }
  .arrow {
    font-size: 3rem;
  }
  .arrow:hover {
    color: #2850bd;
  }
  .pageInputBox {
    display: flex;
    justify-content: end;
    input {
      width: 100px;
      outline: auto;
    }
  }
`;

const ViewCountBox = styled.div`
  width: 92%;
  display: flex;
  position: relative;
  top: 50px;
  justify-content: end;
  border-radius: 15px;
  overflow: hidden;
  select {
    width: 75px;
    text-align: center;
  }
`;

const SearchBox = styled.div`
  &.dark {
    background-color: #111111;
    color: white;
    box-shadow: rgba(153, 153, 153, 0.25) 0px 14px 28px,
      rgba(160, 160, 160, 0.22) 0px 10px 10px;
    input {
      color: white;
      background-color: rgb(70, 70, 70);
    }
  }
  &:not(.dark) input {
    background-color: #f0f0f0;
  }
  & > div {
    width: 50%;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      font-family: "Bebas Neue", "Do Gyeon";
      font-weight: 400;
      width: 100%;
      padding: 15px 20px;
      border-radius: 10px;
    }
  }
  margin: auto;
  margin-top: 20px;
  width: 85%;
  display: flex;
  column-gap: 20px;
  padding: 0px 0px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 15px;
  &:not(.dark) {
    background-image: url("/img/sea.png");
    background-repeat: no-repeat;
    background-size: 100% 180%;
    background-position-y: -55px;
  }
  .future {
    font-size: 2rem;
    letter-spacing: 2rem;
    overflow: hidden;
    border-radius: 15px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &.dark .future {
    background-image: url("/img/space.png");
  }
  .future::after {
    content: "";
    overflow: hidden;
    position: absolute;
    right: 0;
    width: 50%;
    height: inherit;
  }
  .searchInputBox {
    position: relative;
  }
  .searchInputBox div {
    cursor: pointer;
    img {
      width: inherit;
      height: inherit;
    }
    position: absolute;
    border-radius: 5px;
    right: 30px;
    width: 32px;
    height: 32px;
    background-color: #2850bd;
  }
  &.dark .searchInputBox div {
    background-color: #c5c5c5;
  }
`;

const DataBox = styled.div`
  margin: auto;
  width: 93%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  padding: 20px 0px;
  @media (max-width: 1024px) {
    flex-direction: column;
    row-gap: 50px;
  }
`;

const LatestBlockBox = styled.div`
  &.dark {
    background-color: #111111;
    color: white;
    box-shadow: rgba(153, 153, 153, 0.25) 0px 14px 28px,
      rgba(160, 160, 160, 0.22) 0px 10px 10px;
  }
  background-color: white;
  width: 40%;
  border-radius: 15px;
  border: black 1px solid;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .block {
    border-bottom: 1px solid #9e9e9e;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;
    .left {
      width: 40%;
      display: flex;
      column-gap: 20px;
      align-items: center;
      text-align: center;
      & > div {
        display: flex;
        flex-direction: column;
      }
    }
    .middle {
      width: 35%;
      display: flex;
      flex-direction: column;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .right {
      display: flex;
      width: 25%;
      & > span {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        text-align: center;
        padding: 5px 10px;
        white-space: nowrap;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: rgba(194, 194, 194, 0.25) 0px 30px 60px -12px inset,
          rgba(235, 235, 235, 0.3) 0px 18px 36px -18px inset;
      }
    }
  }
  @media (max-width: 1024px) {
    width: 90%;
    margin: auto;
    .left {
      justify-content: center;
    }
  }
`;
const LatestTransactionBox = styled.div`
  &.dark {
    background-color: #111111;
    color: white;
    box-shadow: rgba(153, 153, 153, 0.25) 0px 14px 28px,
      rgba(160, 160, 160, 0.22) 0px 10px 10px;
  }
  width: 40%;
  background-color: white;
  text-align: center;
  border-radius: 15px;
  border: black 1px solid;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .tx {
    border-bottom: 1px solid #9e9e9e;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;
    .left {
      width: 30%;
      display: flex;
      column-gap: 20px;
      align-items: center;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      & > div {
        display: flex;
        flex-direction: column;
      }
    }
    .middle {
      width: 35%;
      display: flex;
      flex-direction: column;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .right {
      width: 35%;
      & > span {
        padding: 5px 10px;
        white-space: nowrap;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: rgba(194, 194, 194, 0.25) 0px 30px 60px -12px inset,
          rgba(235, 235, 235, 0.3) 0px 18px 36px -18px inset;
      }
    }
  }
  @media (max-width: 1024px) {
    width: 90%;
    margin: auto;
  }
`;
