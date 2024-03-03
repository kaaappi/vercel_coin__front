import React, { FC } from "react";
import RegForm from "./RegForm/RegForm";
import endpoint from "../api-url/endpoint";

const RegPage: FC = () => {
  return (
    <div>
      <RegForm
        accountAction={"Registration"}
        greet={"Welcome"}
        link={`${endpoint}/auth/registration`}
      />
    </div>
  );
};
export default RegPage;
