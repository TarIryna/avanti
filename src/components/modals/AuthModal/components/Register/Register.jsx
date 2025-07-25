import React from "react";
import RegistrationForm from "./RegistrationForm";
import GoogleButton from "../GoogleButton/GoogleButton";

const Register = () => {
  return (
    <>
      <RegistrationForm />
      <GoogleButton mode="register" />
    </>
  );
};
export default Register;
