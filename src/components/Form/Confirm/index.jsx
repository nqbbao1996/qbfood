import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import StickySuccessAlert from "../../../utils/alert";
import {
  getDatabase,
  ref,
  child,
  get,
  Database,
  set,
  update,
  push,
  remove,
  once,
} from "firebase/database";

const fadeIn = keyframes`
  0% { background: rgba(0, 0, 0, 0);}
  100% { background: rgba(0, 0, 0, 0.6); }
`;
const Formbackground = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 1s cubic-bezier(0.17, 0.85, 0.45, 1) forwards;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
const ModalContainer = styled.div`
  background-color: var(--color-dark);
  padding: 20px;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  z-index: 40;
  position: fixed;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalContent = styled.div`
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  padding: 1rem;
  max-width: 400px;
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const ConfirmationModal = ({ id, isShow, onClose, refetch }) => {
  const param = useParams();

  // const handleConfirm = async () => {
  //   try {
  //     const result = await axios({
  //       url: `http://localhost:3004/${param.id}/${id}`,
  //       method: "delete",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (result.status === 200) {
  //       onClose();
  //       refetch();
  //       handleApiStatus(true);
  //     }
  //   } catch (error) {
  //     alert("Thất bại, vui lòng kiểm tra lại");
  //     console.log(error);
  //   }
  // };

  // delete
  function deletePostById() {
    const db = getDatabase();
    remove(ref(db, `${param.id}/${id}`))
      .then(() => {
        console.log("Node successfully removed!");
        onClose();
        refetch();
      })
      .catch((error) => {
        console.error("Error removing node:", error);
        alert("Thất bại, vui lòng kiểm tra lại");
      });
  }

  const datadele = "-NO-lqoUseH0NTWx4AOR";

  return (
    <>
      <Formbackground
        onClick={() => onClose()}
        style={{ display: isShow ? "block" : "none" }}
      ></Formbackground>
      {isShow && (
        <ModalContainer>
          <ModalContent>
            <p>Are you sure you want to continue?</p>
            <ModalActions>
              <Button onClick={() => onClose()}>Cancel</Button>
              <Button onClick={deletePostById}>Confirm</Button>
            </ModalActions>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default ConfirmationModal;
