import Image from "next/image";
import { signIn } from "next-auth/react";
import GoogleIcon from "@/assets/icons/google.svg";
import { GoogleBtn } from "./styles";
import { useRouter } from "next/navigation";

const GoogleButton = ({ mode }) => {
  const { push } = useRouter();
  const text = mode === "login" ? "Логін" : "Ресєстрація";
  const onGoogleLogin = async () => {
    const result = await signIn("google");

    if (!result?.error) {
      push("/dashboard");
    } else {
      alert("Ошибка: " + result.error);
    }
  };

  return (
    <GoogleBtn onClick={onGoogleLogin}>
      <p>{`${text} через аккаунт`}</p>
      <Image src={GoogleIcon} alt="google login" width="100" height="30" />
    </GoogleBtn>
  );
};

export default GoogleButton;
