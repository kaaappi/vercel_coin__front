import React, { FC, useEffect, useMemo, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ListItem from "./CoinsList/ListItem";
import Loader from "./UI/Loader/Loader";
import { useActions } from "../hooks/useAction";

const HomePage: FC = () => {
  const { fetchCoins } = useActions();
  const { storeCoins } = useActions();
  const { coins, page, limit } = useTypedSelector((state) => state.coin);
  useEffect(() => {
    storeCoins(coins);
  }, [coins]);

  useEffect(() => {
    fetchCoins(limit, page);
  }, [page, limit]);

  const likedCoins = useTypedSelector((state) => state.likedCoins);
  const storedCoins = useTypedSelector((state) => state.storeCoins);

  if (!storedCoins.length) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <h1 className={"h1__marg"}>Liked Coins</h1>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Price change 24h</th>
            <th>ALL TIME</th>
          </tr>
        </thead>
        <tbody>
          {likedCoins.map((likedCoin, index) => {
            const coin = storedCoins.find((coin) => coin.id === likedCoin);
            if (coin) {
              return (
                <ListItem {...coin} key={coin.symbol} nums_of_coins={index} />
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
