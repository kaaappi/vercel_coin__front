import React, { FC } from "react";
import RegForm from "./RegForm/RegForm";

const LogIn: FC = () => {
  return (
    <div>
      <RegForm
        endpoint={"https://coingecko-back.onrender.com/auth/login"}
        buttonText={"Log in"}
      />
    </div>
  );
};

export default LogIn;
