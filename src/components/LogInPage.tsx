import React, { FC } from "react";
import RegForm from "./RegForm/RegForm";
import endpoint from "../api-url/endpoint";

const LogIn: FC = () => {
  return (
    <div>
      <RegForm
        accountAction={"Login"}
        greet={"Welcome back"}
        link={`${endpoint}/auth/login`}
      />
    </div>
  );
};

export default LogIn;
