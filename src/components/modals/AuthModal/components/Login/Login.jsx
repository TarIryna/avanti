import LoginForm from "../../LoginForm/LoginForm";
import GoogleButton from "../GoogleButton/GoogleButton";

const Login = () => {
  return (
    <>
      <LoginForm />
      <GoogleButton mode="login" />
    </>
  );
};

export default Login;
