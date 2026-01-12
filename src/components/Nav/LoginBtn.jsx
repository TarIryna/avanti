import { useModal } from "@ebay/nice-modal-react/lib/esm";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS, LOGIN } from "@/constants/constants";
import { AuthButton } from "./styles";
import AuthIcon from "@/assets/icons/auth.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/fetchActions/user/useUser";

registerDynamicModal(
  MODALS.AUTHORIZATION,
  import("@/components/modals/AuthModal/AuthModal")
);

const LoginButton = () => {
  const { show: showAuth } = useModal(MODALS.AUTHORIZATION);
  const { push } = useRouter();
  const { data: user, isLoading, isSuccess } = useUserSession();
  const isAuth = !!user && isSuccess

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
            src={AuthIcon}
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
