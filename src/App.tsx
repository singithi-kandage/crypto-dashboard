import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from "components/header";
import CoinMarketData from "pages/coinMarketData";
import CoinPriceHistory from "pages/coinPriceHistory";

import "./App.scss";

export const history = createBrowserHistory();

export const App = () => {
  return (
    <div className="app">
      <Header headerText={"Coin Gecko Dashboard"} />

      <main className="main">
        <Router>
          <Routes>
            <Route path="/" element={<CoinMarketData />} />
            <Route path="/:id" element={<CoinPriceHistory />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
