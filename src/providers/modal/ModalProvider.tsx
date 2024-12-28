"use client";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { createContext } from "react";

export const ModalContext = createContext({
  isOpen: false,
  showModal: () => {},
  hideModal: () => {},
  setModal: (children: React.ReactNode) => {},
  setModalHeader: (header: string) => {},
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<React.ReactNode>(<></>);
  const [modalHeader, setModalHeader] = useState<string | undefined>();

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  const closeWhenClickBlackRegionHandler = () => {
    setIsOpen(false);
  };
  const onCloseButtonClickHandler = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        showModal,
        hideModal,
        setModal,
        setModalHeader,
      }}
    >
      <Modal
        isOpen={isOpen}
        onClickBlackRegion={closeWhenClickBlackRegionHandler}
        onClosebuttonClick={onCloseButtonClickHandler}
        header={modalHeader}
      >
        {modal}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
}
