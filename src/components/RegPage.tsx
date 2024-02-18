import React, { FC } from "react";
import RegForm from "./RegForm/RegForm";

const RegPage: FC = () => {
  return (
    <div>
      <RegForm
        endpoint={"https://coingecko-back.onrender.com/auth/registration"}
        buttonText={"Registration"}
      />
    </div>
  );
};
export default RegPage;
