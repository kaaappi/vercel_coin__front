import React, { FC, useState } from "react";
import axios from "axios";
import { response } from "express";
import { useNavigate } from "react-router-dom";

interface RegFormProps {
  endpoint: string;
  buttonText: string;
}

const RegForm: FC<RegFormProps> = ({ endpoint, buttonText }) => {
  const [username, setUserName] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [usernameIsValid, setUsernameError] = useState(false);
  const [passwordIsValid, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    validateUsername(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };
  const validateUsername = (value: string) => {
    if (value === "") {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };
  const validatePassword = (value: string) => {
    if (value.length < 4 || value.length > 9) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleRegistration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (usernameIsValid && passwordIsValid) {
      const response = await axios
        .post(endpoint, {
          username: username,
          password: password,
        })
        .catch(function (error) {
          if (error.response.data) {
            alert(
              `${error.response.data.message}:${
                error.response.data.errors === undefined
                  ? null
                  : error.response.data.errors.errors.map(
                      (error: any) => error.msg
                    )
              }`
            );
          }
        })
        .then(function (response) {
          if (response) localStorage.setItem("jwtToken", response.data.token);
          navigate("/");
        });
    } else {
      alert("Please fix the validation errors.");
    }
  };

  return (
    <div className="container__for__registration">
      <form>
        <h2 className="centre_h2">{buttonText}</h2>
        <div className="input__container">
          <input
            placeholder={"Username *"}
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={
              usernameIsValid ? "input__reg valid" : "input__reg invalid"
            }
          />
          <span
            className={
              usernameIsValid ? "info__form positive" : "info__form negative"
            }
          >
            Username is required
          </span>
        </div>
        <div className="input__container">
          <input
            placeholder={"Password *"}
            type="password"
            value={password}
            autoComplete="on"
            onChange={handlePasswordChange}
            className={
              passwordIsValid ? "input__reg valid" : "input__reg invalid"
            }
          />
          <span
            className={
              passwordIsValid ? "info__form positive" : "info__form negative"
            }
          >
            Password is required
          </span>
          {passwordIsValid ? (
            <div className="info__form positive">✔️</div>
          ) : (
            <div className="info__form negative">
              Must be more than 4 symbols and less than 12
            </div>
          )}
        </div>
        <button onClick={handleRegistration} className="btn btn__register">
          {buttonText}
        </button>
        {buttonText === "Registration" ? (
          <div onClick={() => navigate("/login")} className="link__reg">
            Already have an account? Log in
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default RegForm;
