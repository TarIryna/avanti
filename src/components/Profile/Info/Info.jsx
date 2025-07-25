import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import { MODALS } from "@/constants/constants";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import * as S from "./styles";
import { useModal } from "@ebay/nice-modal-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

registerDynamicModal(
  MODALS.UPDATE_PROFILE,
  import("@/components/modals/UpdateProfile/UpdateProfileModal")
);

const Info = () => {
  const { data: session } = useSession();
  const { show: showUpdate } = useModal(MODALS.UPDATE_PROFILE);
  const user = session?.user;
  const { push } = useRouter();

  const onSignOut = () => {
    signOut();
    push("/");
  };

  return (
    <>
      <h2>Дані профіля</h2>
      <S.Line>
        <p>Ім'я:</p>
        <p>{user?.name}</p>
      </S.Line>
      <S.Line>
        <p>Прізвище:</p>
        <p>{user?.surname}</p>
      </S.Line>
      <S.Line>
        <p>Телефон:</p>
        <p>{user?.phone}</p>
      </S.Line>
      <S.Line>
        <p>Email:</p>
        <p>{user?.email}</p>
      </S.Line>
      <S.Line>
        <p>Місто:</p>
        <p>{user?.city}</p>
      </S.Line>
      <S.Line>
        <p>Реквізити доставки:</p>
        <p>{user?.adress}</p>
      </S.Line>
      <Button onClick={() => showUpdate(user)}>Оновити дані</Button>
      <Button onClick={onSignOut}>Вийти з аккаунту</Button>
    </>
  );
};

export default Info;
