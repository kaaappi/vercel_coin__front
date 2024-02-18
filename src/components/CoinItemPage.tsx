import React, { FC, useEffect, useState } from "react";
import { SingleCoinState } from "../types/coin";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowPrice from "../images/arrow-for-price-change/ArrowPrice";
import ArrowChangePercentage from "../images/arrow-change-percentage/ArrowChangePercentage";
import Reddit from "../images/logos/Reddit";
import LineChart from "./Chart/LineChart";

type CoinItemPageParams = {
  id: string;
};
const CoinItemPage: FC = () => {
  const [coin, setCoin] = useState<SingleCoinState | null>(null);
  const [days, setDays] = useState(30);

  const { id } = useParams<CoinItemPageParams>();
  const navigate = useNavigate();

  async function fetchSingleCoin() {
    try {
      const response = await axios.get<SingleCoinState>(
        `https://coingecko-back.onrender.com/getCoinData/${id}`
      );
      console.log(response.data);
      setCoin(response.data);
    } catch (e) {
      alert(e);
    }
  }
  useEffect(() => {
    fetchSingleCoin();
  }, []);

  if (!coin) return null;
  return (
    <div className={"wrapper"}>
      <div className={"header__button"}>
        <button onClick={() => navigate("/coins")} className="btn">
          Back
        </button>
      </div>
      <div className={"overview"}>
        <div className={"left-column"}>
          <div className={"overview__rank"}>Rank #{coin.market_cap_rank}</div>
          <div className={"overview__inline-flex"}>
            <img src={coin.image} />
            <span className={"overview__name"}>
              {coin.name} ({coin.symbol})
            </span>
          </div>
          <div className={"overview__inline-flex"}>
            <span className={"overview__price"}>
              ${coin.price_in_usd.toLocaleString()}
            </span>
            <span className={"overview__24h"}>
              <ArrowPrice
                className={
                  coin.price_change_percentage_24h > 0
                    ? "arrow-green"
                    : "arrow-red"
                }
              />
              <span
                className={
                  coin.price_change_percentage_24h > 0
                    ? "positive overview__percentage"
                    : "negative overview__percentage"
                }
              >
                {Number(coin.price_change_percentage_24h.toFixed(1))}%
              </span>
            </span>
          </div>
          <div className={"overview__inline-flex"}>
            <span className={"overview__info__vs"}>
              {coin.price_in_btc} BTC
            </span>
            <span className={"overview__info__vs__percentage"}>
              <span
                className={
                  coin.market_cap_change_percentage_24h_in_btc > 0
                    ? "positive "
                    : "negative"
                }
              >
                {coin.market_cap_change_percentage_24h_in_btc.toFixed(1)}%
              </span>
              <ArrowChangePercentage
                className={
                  coin.market_cap_change_percentage_24h_in_btc > 0
                    ? "arrow-green "
                    : "arrow-red"
                }
              />
            </span>
          </div>
          <div className={"overview__stats"}>
            <div className={"stats__column"}>
              <div className={"stats__item"}>
                <div className={"stats__title"}>Market Cap</div>
                <div className={"stats__info"}>
                  ${coin.market_cap_in_usd.toLocaleString()}
                </div>
              </div>
              <div className={"stats__item"}>
                <div className={"stats__title"}>24 Hour Trading Vol</div>
                <div className={"stats__info"}>
                  ${coin.total_volume_in_usd.toLocaleString()}
                </div>
              </div>
              <div className={"stats__item"}>
                <div className={"stats__title"}>Fully Diluted Valuation</div>
                <div className={"stats__info"}>
                  ${coin.fully_diluted_valuation_in_usd.toLocaleString()}
                </div>
              </div>
            </div>
            <div className={"stats__column"}>
              <div className={"stats__item"}>
                <div className={"stats__title"}>Circulating Supply</div>
                <div className={"stats__info"}>
                  {coin.total_supply.toLocaleString()}
                </div>
              </div>
              <div className={"stats__item"}>
                <div className={"stats__title"}>Total Supply</div>
                <div className={"stats__info"}>
                  {coin.total_supply.toLocaleString()}
                </div>
              </div>
              <div className={"stats__item"}>
                <div className={"stats__title"}>Max Supply</div>
                <div className={"stats__info"}>
                  {coin.max_supply !== undefined && coin.max_supply !== null
                    ? coin.max_supply.toLocaleString()
                    : "No data"}
                  {/*${coin.market_data.max_supply.toLocaleString()}*/}
                </div>
              </div>
            </div>
          </div>
          <div className={"days"}>
            <button className={"btn overview__btn"} onClick={() => setDays(1)}>
              24h
            </button>
            <button className={"btn overview__btn"} onClick={() => setDays(7)}>
              7d
            </button>
            <button className={"btn overview__btn"} onClick={() => setDays(14)}>
              14d
            </button>
            <button className={"btn overview__btn"} onClick={() => setDays(30)}>
              30d
            </button>
            <button className={"btn overview__btn"} onClick={() => setDays(90)}>
              90d
            </button>
            <button
              className={"btn overview__btn"}
              onClick={() => setDays(180)}
            >
              180d
            </button>
            <button
              className={"btn overview__btn"}
              onClick={() => setDays(365)}
            >
              1y
            </button>
          </div>
          <div className={"chart"}>
            <LineChart coin_id={coin.id} days={days} />
          </div>
        </div>
        <div className={"right-column"}>
          <h2 className={"info__header"}>Info</h2>
          <div className={"info__content"}>
            <div className={"info__item"}>
              <span>Website</span>
              <div>
                <a className={"item__link"} href={coin.links_homepage[0]}>
                  {
                    coin.links_homepage[0]
                      .replace(/^(https?:\/\/)?(www\.)?/, "")
                      .split("/")[0]
                  }
                </a>
              </div>
            </div>
            <div className={"info__item"}>
              <span>Explorers</span>
              <div>
                {coin.blockchain_site
                  .filter((site) => site !== "")
                  .map((site) => (
                    <a className={"item__link"} href={site}>
                      {
                        site
                          .replace(/^(https?:\/\/)?(www\.)?/, "")
                          .split("/")[0]
                      }
                    </a>
                  ))}
              </div>
            </div>
            <div className={"info__item"}>
              <span>Community</span>
              <div className={"contact__info"}>
                <a href={coin.subreddit_url} className={"item__link"}>
                  <Reddit />
                  Reddit
                </a>
              </div>
            </div>
            <div className={"info__item"}>
              <span>Source Code</span>
              <div className={"contact__info"}>
                <a className={"item__link"} href={coin.repos_url_github}>
                  Github
                </a>
              </div>
            </div>
            <div className={"info__item"}>
              <span>API id</span>
              <div className={"item__link"}>{coin.id}</div>
            </div>
            <div className={"info__item"}>
              <span>Tags</span>
              <div>
                {coin.categories.map((category) => (
                  <a className={"item__link"}>{category}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default CoinItemPage;
