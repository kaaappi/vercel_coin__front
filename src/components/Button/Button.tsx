import React, { FC, memo } from "react";
import ArrowInput from "../../images/arrow/arrow-down";

interface IButton {
  className: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  arrowDirection: string;
}

const Button: FC<IButton> = ({
  arrowDirection,
  onMouseLeave,
  onMouseEnter,
  onClick,
  className,
}) => {
  return (
    <button
      className={`arrow-${arrowDirection}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ArrowInput className={`${className}`} />
    </button>
  );
};

export default memo(Button);
