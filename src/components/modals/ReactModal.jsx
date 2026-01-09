import { useModal } from "@ebay/nice-modal-react";
import React, { useEffect } from "react";
import Modal from "react-modal";

const getModalStyles = (isHidden, isSecond) => ({
  overlay: {
    backgroundColor: isSecond ? "transparent" : "rgba(15, 15, 15, 0.8)",
    backdropFilter: isSecond ? "blur(0)" : "blur(8px)",
    width: "100vw",
    height: "100%",
    zIndex: 200,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0",
  },
  content: {
    width: "auto",
    height: "auto",
    maxWidth: "100vw",
    padding: "0",
    margin: "auto",
    background: "none",
    border: "none",
    overflow: "visible",
    borderRadius: "0",
    position: "static",
    outline: "none",
    opacity: isHidden ? 0 : 1,
    transition: "opacity 300ms ease",
  },
});

const ReactModal = ({
  id,
  children,
  isSecond = false,
  isHidden = false,
  closeOnClickOutside = true,
}) => {
  const { visible, hide } = useModal(id);
  const handleClose = () => {
    if (typeof hide === "function" && closeOnClickOutside) {
      hide();
    }
  };
  useEffect(() => {
    if (visible) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window && window.scrollTo(0, Number.parseInt(scrollY || "0") * -1);
    }
  }, [visible]);

  return (
    <Modal
      isOpen={visible}
      ariaHideApp={false}
      style={getModalStyles(isHidden, isSecond)}
      closeTimeoutMS={isSecond || isHidden ? 0 : 400}
      onRequestClose={handleClose}
    >
      {children}
    </Modal>
  );
};

export default ReactModal;
