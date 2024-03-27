import { useState } from "react";
import { Link } from "react-router-dom";
import "../Seach Coins/SearchCoins.scss";
import { TailSpin } from "react-loader-spinner";
import "../Navbar/Navbar.scss";

const SearchCoins = ({ mode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]=useState(null)

  function handleInput(event) {
    setSearchQuery(event.target.value);
  }

  function handleKey(event) {
    if (event.key === "Enter") {
      setLoading(true);
        searchCoins();
        
    }
  }


  function searchCoins() {
      try{
        fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setCoins(data.coins);
          setLoading(false);
        });
      }
      catch(error){
        console.log(error.message)
        setError(error.message)
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
