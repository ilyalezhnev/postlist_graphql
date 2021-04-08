import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP, LOGIN } from "../graphql/mutations";
import { AUTH_TOKEN_KEY } from "../common/const";
import { useHistory } from "react-router";

export const AuthPage = () => {
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    newUser: true,
    email: "",
    password: "",
  });

  const [signup] = useMutation(SIGNUP, {
    variables: {
      email: formFields.email,
      password: formFields.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN_KEY, signup.token);
      history.push("/");
      console.log("signup", signup);
    },
    onError: (error) => {
      console.log("login err", error);
    },
  });

  const [login] = useMutation(LOGIN, {
    variables: {
      email: formFields.email,
      password: formFields.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN_KEY, login.token);
      history.push("/");
      console.log("login", login);
    },
    onError: (error) => {
      console.log("signup err", error);
    },
  });

  return (
    <div className="page-layout">
      <h2>Enter your credentials</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formFields.newUser ? login() : signup();
        }}
      >
        <label>
          Email
          <input
            placeholder="email"
            name="email"
            onChange={(e) =>
              setFormFields({
                ...formFields,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <label>
          Password
          <input
            placeholder="password"
            name="password"
            onChange={(e) =>
              setFormFields({
                ...formFields,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <button type="submit">{formFields.newUser ? "Login" : "Signup"}</button>{" "}
        or{" "}
        <span
          className="pointer"
          onClick={() => {
            setFormFields({
              ...formFields,
              newUser: !formFields.newUser,
            });
          }}
        >
          {formFields.newUser ? "Signup" : "Login"}
        </span>
      </form>
    </div>
  );
};
