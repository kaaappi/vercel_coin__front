import React, { FC, memo, useState } from "react";
import Home from "../../images/imgs-for-side-nav/Home";
import { useLocation, useNavigate } from "react-router-dom";
import SideNavHeart from "../../images/imgs-for-side-nav/SideNavHeart";

const SideNavigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState<string>(location.pathname);
  const onClickHeart = () => {
    navigate("/coins");
    setActiveIcon("/coins");
  };
  const onClickHome = () => {
    navigate("/");
    setActiveIcon("/");
  };

  return (
    <div className="side-nav">
      <div className="side-centre">
        <span
          onClick={onClickHome}
          className={activeIcon === "/" ? "side-state active" : "side-state"}
        >
          <Home />
        </span>
        <span
          onClick={onClickHeart}
          className={
            activeIcon === "/coins" ? "side-state active" : "side-state"
          }
        >
          <SideNavHeart />
        </span>
      </div>
    </div>
  );
};

export default memo(SideNavigation);
