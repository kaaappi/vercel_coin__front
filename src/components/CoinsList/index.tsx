import React, { FC, memo, useMemo, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../UI/Loader/Loader";
import ListItem from "./ListItem";
import { ISort } from "../../types/sort";
import { sortData } from "../../utils/sortData";

const ListHeader: FC = () => {
  const storedCoins = useTypedSelector((state) => state.storeCoins);
  const [field, setField] = useState<ISort>({
    name: "id",
    direction: false,
  });

  const coinsMemorized = useMemo(() => {
    if (!storedCoins.length) return [];
    return sortData(field.name, field.direction, storedCoins);
  }, [field, storedCoins]);

  if (!storedCoins.length) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th
            onClick={() => {
              setField((p) => ({
                name: "current_price",
                direction: !p?.direction,
              }));
            }}
          >
            Price
          </th>
          <th
            onClick={() => {
              setField((p) => ({
                name: "price_change_percentage_24h",
                direction: !p?.direction,
              }));
            }}
          >
            Price change 24h
          </th>
          <th
            onClick={() => {
              setField((p) => ({
                name: "ath_change_percentage",
                direction: !p?.direction,
              }));
            }}
          >
            ALL TIME
          </th>
        </tr>
      </thead>
      <tbody>
        {coinsMemorized.map((coin, index) => (
          <ListItem {...coin} key={coin.symbol} nums_of_coins={index} />
        ))}
      </tbody>
    </table>
  );
};

export default memo(ListHeader);
