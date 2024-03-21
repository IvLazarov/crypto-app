import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SearchCoins from "./Components/Seach Coins/SearchCoins";
import CoinDescription from "./Components/Coin Description/CoinDescription";
import Navbar from "./Components/Navbar/Navbar";
import ErrorPage from "./Components/Error Page/ErrorPage";

function App() {
  const [mode, setMode] = useState(false);

  function toggleMode() {
    setMode(!mode);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home mode={mode} />} />
          <Route path="/search_coins" element={<SearchCoins mode={mode} />} />
          <Route
            path="/coin_description/:id"
            element={<CoinDescription mode={mode} />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
