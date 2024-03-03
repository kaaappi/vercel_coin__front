import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import Pagination from "../Pagination/Pagination";
import { getPageCount } from "../../utils/pages";
import ArrowInput from "../../images/arrow/arrow-down";

const ControlPanel: FC = () => {
  const { fetchCoins } = useActions();
  const { coins, page, limit } = useTypedSelector((state) => state.coin);
  const [totalPages, setTotalPages] = useState(10);
  const { storeCoins } = useActions();
  const [value, setValue] = useState(10);

  useEffect(() => {
    storeCoins(coins);
  }, [coins]);

  useEffect(() => {
    fetchCoins(limit, page);
  }, [page, limit]);

  const changeLimit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (value < 5) {
      alert("value must be more than 5 ");
      e.preventDefault();
    } else {
      e.preventDefault();
      setTotalPages(getPageCount(100, Number(value)));
      fetchCoins(Number(value));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setValue(parseInt(e.target.value));
    }
  };

  const incrementValue = () => {
    setValue((prevValue) => prevValue + 1);
  };
  const decrementValue = () => {
    setValue((prevValue) => prevValue - 1);
  };

  const [isTopHovered, setIsTopHovered] = useState(false);
  const [isBottomHovered, setIsBottomHovered] = useState(false);

  const handleHoverTop = () => {
    setIsTopHovered(!isTopHovered);
  };
  const handleHoverBottom = () => {
    setIsBottomHovered(!isBottomHovered);
  };

  return (
    <>
      <div>
        <div className={"page__container"}>
          <Pagination totalPages={totalPages} page={page} maxPages={5} />

          <div className="page__wrapper">
            <div className="input-wrapper">
              <div className={"buttons"}>
                <button
                  className="arrow-top"
                  onClick={incrementValue}
                  onMouseEnter={handleHoverTop}
                  onMouseLeave={handleHoverTop}
                >
                  <ArrowInput
                    className={`${
                      isTopHovered ? "arrow-black" : "arrow-white"
                    }`}
                  />
                </button>
                <button
                  className="arrow-bottom"
                  onClick={decrementValue}
                  onMouseEnter={handleHoverBottom}
                  onMouseLeave={handleHoverBottom}
                >
                  <ArrowInput
                    className={`arrow ${
                      isBottomHovered ? "arrow-black" : "arrow-white"
                    }`}
                  />
                </button>
              </div>

              <input
                type="text"
                value={value}
                onChange={handleInputChange}
                className="input__change__amount"
              />
              <button
                onClick={changeLimit}
                className="btn"
                style={{ backgroundColor: "inherit" }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ControlPanel);
