import { useState } from "react";
import { Link } from "react-router-dom";
import "../Seach Coins/SearchCoins.scss";
import { TailSpin } from "react-loader-spinner";
import "../Navbar/Navbar.scss";

const SearchCoins = ({ mode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  function handleInput(event) {
    setSearchQuery(event.target.value);
  }

  function handleKey(event) {
    if (event.key === "Enter") {
      setLoading(true);
      searchCoins();
      if (searchQuery.length > 0) {
        setSearchTerm(true);
      }
    }
  }

  function searchCoins() {
    try {
      fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setCoins(data.coins);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={`search-coins ${mode && "dark-mode"}`}>
      <div className={`search-bar ${mode && "search-bar-dark"}`}>
        <h2>Search Coins</h2>
        <div>
          <input
            type="text"
            placeholder="Search Coins..."
            value={searchQuery}
            onChange={handleInput}
            onKeyDownCapture={handleKey}
            autoFocus
          />
        </div>
      </div>

      <div className="coins">
        {searchTerm && coins.length === 0 && !loading && (
          <h2>Coin not found!</h2>
        )}

        {loading ? (
          <TailSpin />
        ) : (
          coins.map((coin) => {
            return (
              <Link key={coin.id} to={`/coin_description/${coin.id}`}>
                <img src={coin.large} alt={coin.name} />
                <section>{coin.name}</section>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchCoins;
