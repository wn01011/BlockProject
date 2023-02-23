import { useSelector } from "react-redux";
import styled from "styled-components";
import TxCardContainer from "./TxCard/Container";

const AddressComponent = ({ address, balance, from, to }) => {
  const dark = useSelector((state) => state.util.dark);

  return (
    <AddressBox dark={dark}>
      <TitleBox>
        Address <span>{address}</span>
      </TitleBox>
      <DataBox>
        <div>
          <span>Balance:</span>
          <span>{balance} Ether</span>
        </div>
      </DataBox>
      <TxCardContainer title={"from"} txs={from} dark={dark}></TxCardContainer>
      <TxCardContainer title={"to"} txs={to} dark={dark}></TxCardContainer>
    </AddressBox>
  );
};

export default AddressComponent;

const AddressBox = styled.div`
  width: 86%;
  padding: 0 7%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
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
  & > span {
    color: grey;
  }
`;

const DataBox = styled.div`
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
  & > div {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    padding: 0 20px;
    & > span:last-child {
      padding: 10px 20px;
    }
  }
`;
