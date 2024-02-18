import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { storageId } from "../../constants/constants";
import { addCoin } from "../../store/action-creators/coin";
import { useActions } from "../../hooks/useAction";
import Heart from "../../images/heart/Heart";

const SelectCoin: FC<{ id: string }> = ({ id }) => {
  const likedCoins = useTypedSelector((state) => state.likedCoins);
  const { addCoin, removeCoin } = useActions();
  const isSelected: boolean = likedCoins.includes(id);
  const [isHovered, setIsHovered] = useState(false);

  const saveCoin = (id: string) => {
    if (!isSelected) {
      localStorage.setItem(storageId, JSON.stringify([...likedCoins, id]));
      addCoin(id);
    } else {
      const arr = likedCoins.filter((coin_id) => coin_id !== id);
      localStorage.setItem(storageId, JSON.stringify(arr));
      removeCoin(id);
    }
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <button
      className="clear"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={() => {
        saveCoin(id);
      }}
    >
      <Heart
        className={`${isHovered || isSelected ? "heart-fill" : "heart"}`}
      />
    </button>
  );
};

export default SelectCoin;
