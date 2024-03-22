import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import CoinStats from "./CoinStats";
import "../Coin Description/CoinDescription.scss";
import parse from 'html-react-parser';

const CoinDescription = ({ mode }) => {
  let { id } = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        console.log(data)
        setCoin(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <div id={`coin-description ${mode && "dark-mode"}`}>
      <div className={mode && "dark-mode"}>
        {Object.keys(coin).length === 0 ? (
          <TailSpin />
        ) : (
          <div>
            <div className="coin-title">
              <img src={coin?.image?.large} alt={coin.name} />
              <h1>{coin.name ? coin.name : "Coin not found"}</h1>
            </div>
            <CoinStats />
            <div className="coin-text">
              {readMore 
                ? parse(coin?.description?.en)
                : `${coin?.description?.en.substring(0, 300)}...`}

              {coin?.description?.en.length >= 5 && (
                <button
                  className={`read-btn ${mode && "read-btn-dark"}`}
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinDescription;
