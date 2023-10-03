import React from "react";
import "./Modal.styles.scss";
import { MdDeleteOutline } from "react-icons/md";

interface ModalType {
  isModalOpen: boolean;
  children: React.ReactNode;
  setIsModalOpen?: (value: boolean) => void;
}
export default function Modal({
  isModalOpen,
  children,
  setIsModalOpen,
}: ModalType) {
  return (
    <div
      className="modal-container"
      onMouseOver={(e) => {
        e.stopPropagation();
      }}
      style={{
        height: isModalOpen ? "fit-content" : 0,
        boxShadow: !isModalOpen ? "" : "none",
        border: !isModalOpen ? "" : "none",
      }}>
      {children}
      <MdDeleteOutline className="delete" />
    </div>
  );
}
