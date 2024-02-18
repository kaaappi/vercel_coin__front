import React, { FC } from "react";

interface IArrowChangePercentage {
  className?: string;
}

const ArrowChangePercentage: FC<IArrowChangePercentage> = ({ className }) => {
  return (
    <svg
      className={className}
      width="15px"
      height="15px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.7071 9.70711C10.3166 10.0976 9.68342 10.0976 9.29289 9.70711C8.90237 9.31658 8.90237 8.68342 9.29289 8.29289L14.2929 3.29289C14.6834 2.90237 15.3166 2.90237 15.7071 3.29289L20.7071 8.29289C21.0976 8.68342 21.0976 9.31658 20.7071 9.70711C20.3166 10.0976 19.6834 10.0976 19.2929 9.70711L16 6.41421V16C16 17.3261 15.4732 18.5979 14.5355 19.5355C13.5979 20.4732 12.3261 21 11 21H4C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19H11C11.7956 19 12.5587 18.6839 13.1213 18.1213C13.6839 17.5587 14 16.7957 14 16V6.41421L10.7071 9.70711Z" />
    </svg>
  );
};

export default ArrowChangePercentage;
