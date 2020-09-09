import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalTransaction() {
  return (
    <div>
      <Modal isOpen={true}></Modal>
    </div>
  );
}
