import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "../Home/Home.scss";
import "../Navbar/Navbar.scss";

const Home = ({ mode }) => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setTrendingCoins(data.coins);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <div
        className={`trending-coins ${
          mode === false ? "light-mode" : "dark-mode"
        }`}
      >
        <h2>Trending Coins</h2>

        <div className={`info-table ${mode && "info-table-dark"}`}>
          <main>Name</main>
          <section>Price</section>
          <section>Market Cap</section>
          <section>24h %</section>
        </div>
        <div className={`coin-table ${mode && "coin-table-dark"}`}>
          {trendingCoins.length === 0 ? (
            <div className="loading">
              <TailSpin />
            </div>
          ) : (
            trendingCoins.map((trendingCoin) => {
              return (
                <Link
                  key={trendingCoin.item.id}
                  to={`/coin_description/${trendingCoin.item.id}`}
                  className={`coin-description ${
                    mode && "coin-description-dark"
                  }`}
                >
                  <img
                    src={trendingCoin.item.small}
                    alt={trendingCoin.item.name}
                  />
                  <p>
                    {trendingCoin.item.name} - {trendingCoin.item.symbol}
                  </p>
                  <section>{trendingCoin.item.data.price}</section>
                  <section className="cap">
                    {trendingCoin.item.data.market_cap}
                  </section>
                  <section>
                    {trendingCoin.item.data.price_change_percentage_24h.usd.toFixed(
                      2
                    ) <= 0 ? (
                      <div className="negative-index">
                        {trendingCoin.item.data.price_change_percentage_24h.usd.toFixed(
                          2
                        )}
                        %
                      </div>
                    ) : (
                      <div className="positive-index">
                        {trendingCoin.item.data.price_change_percentage_24h.usd.toFixed(
                          2
                        )}
                        %
                      </div>
                    )}
                  </section>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
