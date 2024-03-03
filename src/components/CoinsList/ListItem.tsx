import React, { FC, memo } from "react";
import { Coin } from "../../types/coin";
import SelectCoin from "./SelectCoin";
import { useNavigate } from "react-router-dom";
import ArrowPrice from "../../images/arrow-for-price-change/ArrowPrice";
import { useQuery } from "react-query";
import axios from "axios";

const ListItem: FC<Coin> = ({
  id,
  price_change_percentage_24h,
  ath_change_percentage,
  current_price,
  image,
  name,
  symbol,
  nums_of_coins,
}) => {
  const navigate = useNavigate();
  const onClickTd = () => {
    navigate("/coins/" + id);
  };

  return (
    <tr>
      <td>{nums_of_coins + 1}</td>
      <td key={id} onClick={onClickTd} className={"cursor"}>
        <div>
          <img src={image}></img>
        </div>
        <div>
          <div>{name}</div>
          <div>{symbol}</div>
        </div>
      </td>
      <td>${current_price}</td>
      <td className={price_change_percentage_24h > 0 ? "positive" : "negative"}>
        <ArrowPrice
          className={
            price_change_percentage_24h > 0 ? "arrow-green" : "arrow-red"
          }
        />
        <span>{price_change_percentage_24h.toFixed(2)}%</span>
      </td>
      <td className={ath_change_percentage > 0 ? "positive" : "negative"}>
        <ArrowPrice
          className={ath_change_percentage > 0 ? "arrow-green" : "arrow-red"}
        />
        <span>{ath_change_percentage.toFixed(2)}%</span>
        <SelectCoin id={id} />
      </td>
    </tr>
  );
};

export default memo(ListItem);
