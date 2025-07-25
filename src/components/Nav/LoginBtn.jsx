import { useModal } from "@ebay/nice-modal-react/lib/esm";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS, LOGIN } from "@/constants/constants";
import { AuthButton } from "./styles";
import AuthIcon from "@/assets/icons/auth.svg";
import LoginIcon from "@/assets/icons/login.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/selectors";

registerDynamicModal(
  MODALS.AUTHORIZATION,
  import("@/components/modals/AuthModal/AuthModal")
);

const LoginButton = () => {
  const { show: showAuth } = useModal(MODALS.AUTHORIZATION);
  const { push } = useRouter();
  const { isAuth, user } = useUser();

  const onAuth = () => {
    showAuth({ mode: LOGIN });
  };

  const onProfile = () => {
    push("/profile");
  };

  return (
    <div>
      {isAuth ? (
        <Link href="/profile">
          <AuthButton
            src={user?.image ?? AuthIcon}
            alt="auth button"
            width="25"
            height="25"
            onClick={onProfile}
          />
        </Link>
      ) : (
        <>
          <AuthButton
            alt="auth"
            src={LoginIcon}
            width="30"
            height="30"
            onClick={onAuth}
          />
        </>
      )}
    </div>
  );
};
export default LoginButton;
