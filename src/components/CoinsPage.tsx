import React, { FC } from "react";
import ControlPanel from "./CoinsList/ControlPanel";
import ListHeader from "./CoinsList";

const CoinsPage: FC = () => {
  return (
    <>
      <ListHeader />
      <ControlPanel />
    </>
  );
};

export default CoinsPage;
