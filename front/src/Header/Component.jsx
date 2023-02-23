import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ setDarkFunc, dark, aTagInfo }) => {
  const navigate = useNavigate();

  return (
    <HeaderBox className={dark ? "dark" : ""} aTagInfo={aTagInfo}>
      <UpperBox>
        <div>
          <span>
            ETH Price: <span className="blue"> $1,707.83</span>
            <span className="green"> (+1.82%)</span>
          </span>
          <span>
            <div>
              <img src="/img/gasPump.png" alt="" />
            </div>
            Gas: <span className="blue">22 Gwei</span>
          </span>
        </div>
        <div className="btns">
          <div
            onClick={() => {
              setDarkFunc();
            }}
            className={dark ? "dark" : ""}
          >
            <img src="/img/sun.png" alt="" />
          </div>
          <div>
            <img
              src={
                dark
                  ? "/img/ethereum-original.svg"
                  : "/img/ethereum-original-light.svg"
              }
              alt=""
            />
          </div>
        </div>
      </UpperBox>
      <BottomBox>
        <div
          onClick={() => {
            navigate(`/`);
          }}
          className={dark ? "dark" : ""}
        >
          <img src="/img/EthScanLogo.png" alt="Etherscan" />
          <span>Etherscan</span>
        </div>

        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li className="cancle">Tokens</li>
          <li className="cancle">NFTs</li>
          <li className="cancle">Resources</li>
          <li className="cancle">Developers</li>
          <li className="cancle">More</li>
        </ul>
        <div>Sign In</div>
      </BottomBox>
    </HeaderBox>
  );
};

export default HeaderComponent;

const HeaderBox = styled.div`
  &.dark {
    color: white;
    background-color: #0f0f0f;
  }
  width: 85%;
  padding: 0% 7.5%;
  font-size: 1.05rem;
  font-weight: 400;
  &.dark {
    border-bottom: grey 1px solid;
  }
  ul {
    width: 50%;
    display: flex;
    li {
      list-style: none;
    }
  }
  background-color: white;

  .blue {
    color: #4170d6;
  }
  .green {
    color: green;
  }
`;

const UpperBox = styled.div`
  width: 100%;
  border-bottom: solid 1px grey;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    column-gap: 15px;
    span {
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
  }
  img {
    width: 20px;
    height: 20px;
  }
  div.btns {
    display: flex;
    div {
      display: flex;
      align-items: center;
      padding: 5px;
      border: 1px solid rgb(139, 139, 139);
      border-radius: 5px;
      border: 1px solid transparent;
      background-color: rgb(59, 59, 59);
    }
    div.dark {
      border: 1px solid rgb(139, 139, 139);
      background-color: white;
    }
    div:hover {
      background-color: yellowgreen;
    }
  }
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > ul {
    display: flex;
    justify-content: space-evenly;
  }
  & > div:first-child {
    width: fit-content;
    display: flex;
    column-gap: 20px;
    align-items: center;
    font-size: 1.6rem;
    &.dark {
      color: white;
    }
    &:not(.dark) {
      color: #180733;
    }
    &:hover {
      cursor: pointer;
    }
    img {
      width: 35px;
    }
  }
`;
