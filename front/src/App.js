import MainContainer from "./Main/Container";
import HeaderContainer from "./Header/Container";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LatestBlockContainer from "./Main/LatestBlock/Container";
import LatestTransactionContainer from "./Main/LatestTransaction/Container";
import BlockTransactionContainer from "./Main/LatestBlock/BlockTransactions/Container";
import AddressContainer from "./Main/Address/Container";
import FooterContainer from "./Footer/Container";
import MouseEventComponent from "./MouseEvent/Component";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <MouseEventComponent />
      <HeaderContainer></HeaderContainer>
      <Routes>
        <Route path="/" element={<MainContainer></MainContainer>} />
        <Route
          path="/latestBlock/:blockId/transactions"
          element={<BlockTransactionContainer />}
        />
        <Route
          path="/latestBlock/:blockId"
          element={<LatestBlockContainer />}
        />
        <Route
          path="/latestTransaction/:txHash"
          element={<LatestTransactionContainer></LatestTransactionContainer>}
        />
        <Route
          path="/address/:address"
          element={<AddressContainer></AddressContainer>}
        />
      </Routes>
      <FooterContainer></FooterContainer>
    </div>
  );
}

export default App;
