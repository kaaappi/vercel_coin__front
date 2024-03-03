import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import endpoint from "../../api-url/endpoint";

export interface IUser {
  username: string;
  password: string;
}
interface iRegFrom {
  accountAction: string;
  greet: string;
  link: string;
}

const RegForm: FC<iRegFrom> = ({ accountAction, greet }) => {
  const navigate = useNavigate();

  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = "Username is Required";
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 4 || value.length > 10) {
      error = "Password must be >4 and <10 symbols";
    }
    return error;
  };

  const handleSubmit = async (params: IUser) => {
    try {
      const response = await axios.post(`${endpoint}/auth/login`, {
        username: params.username,
        password: params.password,
      });
      if (response) {
        localStorage.setItem("jwtToken", response.data.token);
        navigate("/coins");
      }
    } catch (error: any) {
      console.error(error, "handleSubmit in newRegForm");
      alert("Error on submit");
    }
  };
  const handleClickChooseType = () => {
    accountAction === "Login" ? navigate("/registration") : navigate("/login");
  };

  return (
    <div className={"primary__container"}>
      <div className={"login__container"}>
        <ChakraProvider>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form className={"form__container"}>
                <div className={"upper__login__container"}>
                  <h1 className={"h1__rewrite"}>{greet}</h1>
                  <h2 className={"h2__rewrite"}>
                    Please enter your details to {accountAction}.
                  </h2>
                </div>

                <Field name="username" validate={validateUsername}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                      mt={10}
                    >
                      <FormLabel>Username</FormLabel>
                      <Input {...field} focusBorderColor={"white"} />
                      <ErrorMessage
                        name="username"
                        component={FormErrorMessage}
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      mt={10}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        focusBorderColor={"white"}
                      />
                      <ErrorMessage
                        name="password"
                        component={FormErrorMessage}
                      />
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={14}
                  className={"login__btn"}
                  colorScheme="whiteAlpha"
                  variant="outline"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  {accountAction}
                </Button>
                <div className={"bottom__login__container"}>
                  <span>
                    Don't have an account?{" "}
                    <span
                      className={"login__link "}
                      onClick={handleClickChooseType}
                    >
                      {accountAction === "Login" ? "Register" : "Login"}
                    </span>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default RegForm;
