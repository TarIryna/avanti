import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
// import { useMediaQuery } from "@/helpers/useMediaQuery";
import { LOGIN, MODALS, REGISTRATION } from "@/constants/constants";
import { AuthModalContext } from "./contexts/authContext";
import { Login, Registration } from "./components";
import Head from "../components/Head/Head";
import { Wrapper, Container, Content, Link } from "../styles";

const AuthorizationModal = create(({ id, mode, res }) => {
  const [activeTab, setActiveTab] = useState(mode);
  const [googleRegMethod, setGoogleRegMethod] = useState(null);
  const { visible, hide } = useModal(id);
  const { visible: isVisibleForgotPass } = useModal(MODALS.FORGOT_PASSWORD);
  const isHiddenModal = isVisibleForgotPass;

  useEffect(() => {
    if (visible) {
      setActiveTab(mode);
    }
  }, [mode, visible]);

  return (
    <ReactModal id={id} closeOnClickOutside={false} isHidden={isHiddenModal}>
      <AuthModalContext.Provider
        value={{
          res,
          setActiveTab,
          googleRegMethod,
          setGoogleRegMethod,
        }}
      >
        <Wrapper>
          <Container>
            <Head close={hide} title="Авторизація" />
            <Content>
              {activeTab === LOGIN ? <Login /> : <Registration />}
              {mode === LOGIN && (
                <Link onClick={() => setActiveTab(REGISTRATION)}>
                  Зареєструватись
                </Link>
              )}
            </Content>
          </Container>
        </Wrapper>
      </AuthModalContext.Provider>
    </ReactModal>
  );
});

export default AuthorizationModal;
