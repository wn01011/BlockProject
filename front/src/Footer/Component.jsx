import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliceText } from "../utils";

const FooterComponent = () => {
  const dark = useSelector((state) => state.util.dark);
  return (
    <Box dark={dark} className={dark ? "dark" : ""}>
      <div className="backTop">
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src="/img/upArrow.png" alt="" /> Back to Top
        </div>
      </div>
      <div className="data-container">
        <div>
          <div className="imgBox">
            <img
              src={
                dark
                  ? "/img/ethereum-original-light.svg"
                  : "/img/ethereum-original.svg"
              }
              alt=""
            />{" "}
            Powered by Ethereum
          </div>
          <div className="subText">
            Etherscan is a Block Explorer and Analytics Platform for Ethereum, a
            decentralized smart contracts platform.
          </div>
          <div className="map">
            <img src={dark ? "/img/map-light.png" : "/img/map.png"} alt="" />
          </div>
        </div>
        <div>
          <div>Company</div>
          <ul>
            <li>About Us</li>
            <li>Brand Assests</li>
            <li>Contact Us</li>
            <li>Careers</li>
            <li>Terms of Service</li>
            <li>Bug Bounty</li>
          </ul>
        </div>
        <div>
          <div>Community</div>
          <ul>
            <li>API Documentation</li>
            <li>Knowledge Base</li>
            <li>Network Status</li>
            <li>Newsletters</li>
            <li>Disqus Comments</li>
          </ul>
        </div>
        <div>
          <div>Products & Services</div>
          <ul>
            <li>Advertise</li>
            <li>Explorer-as-a-Service (EaaS)</li>
            <li>API Plans</li>
            <li>Priority Support</li>
            <li>Blockscan</li>
            <li>Blockscan Chat</li>
          </ul>
        </div>
      </div>
      <div className="etc">
        <div>Etherscan ⓒ 2023 (F1)</div>
        <div>
          Donations:{" "}
          <span>
            <Link to={`/address/0xfC052594Fb4Ca05A8c94bf2EBC535c11a40669d3`}>
              {sliceText("0xfc052594fb4ca05a8c94bf2ebc535c11a40669d3")}
            </Link>
          </span>
        </div>
      </div>
    </Box>
  );
};

export default FooterComponent;

const Box = styled.div`
  box-sizing: border-box;
  border-top: 1px grey solid;
  padding: 0px 7.5% 30px 7.5%;
  width: 100%;

  .backTop {
    display: flex;
    justify-content: end;
    padding: 20px 0px;
    border-bottom: 1px solid grey;
    & > div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    & > div:hover {
      color: #2850bd;
      img {
        filter: invert(46%) sepia(95%) saturate(1536%) hue-rotate(159deg)
          brightness(80%) contrast(111%);
      }
    }
  }
  &:not(.dark) {
    img {
      filter: brightness(0%);
    }
  }
  img {
    width: 20px;
  }
  .imgBox {
    display: flex;
    font-size: 1.2rem;
    column-gap: 10px;
    align-items: center;
    margin-bottom: 10px;
  }
  .map img {
    width: 100%;
  }
  background-color: ${({ dark }) => {
    if (dark) return "#0c0c0cf0";
    else return "#f0f0f000";
  }};

  color: ${({ dark }) => {
    if (dark) return "#f0f0f0";
    else return "#0c0c0cf0";
  }};
  .data-container {
    display: flex;
    padding: 15px 0;
    column-gap: calc(8% / 3);
    & > div {
      width: 23%;
      ul {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        padding: 0;
      }
      li {
        list-style: none;
      }
    }
  }
  .subText {
    font-size: 0.85rem;
  }
  .etc {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-top: 1px solid grey;
    padding-top: 15px;
    div {
      width: 20%;
    }
    a {
      color: #2850bd;
    }
  }
`;
