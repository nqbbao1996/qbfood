import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const Container = styled.div`
  .sidebar {
    position: fixed;
    height: 84vh;
    left: 0;
    z-index: 300;

    padding-top: 20px px;
    width: 250px;
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.85) 40%,
      rgba(0, 0, 0, 0.99) 100%,
      transparent
    );
    transition: transform 0.3s ease-in-out;
    @media (max-width: 768px) {
      transform: translateX(-100%);
      &:hover {
        transform: translateX(0) !important;
        height: 340px;
      }
    }
    @media (max-width: 1024px) {
      width: 200px;
    }
  }

  .hamburger-menu-icon {
    color: var(--color-white);
    font-size: 30px;
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(67, 67, 67) 20%,
      rgba(17, 17, 17) 100%
    );
    left: 0px;
    cursor: pointer;
    display: none;
    &:hover + .sidebar {
      transform: translateX(0);
      height: 340px;
    }
  }

  @media (max-width: 768px) {
    .hamburger-menu-icon {
      display: block;
    }
  }
`;

const Field = styled.div`
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  color: var(--color-white);
  &:hover {
    background: linear-gradient(
      270deg,
      rgba(68, 68, 68, 0.85) 40%,
      rgba(51, 51, 51, 1) 100%,
      transparent
    );
  }
  &.active {
    background: #888;
    color: floralwhite;
`;

const ChildFields = styled.div`
  background: linear-gradient(
    270deg,
    rgba(68, 68, 68, 0.85) 40%,
    rgba(51, 51, 51, 1) 100%,
    transparent
  );
  color: #fff;

  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.5s ease-out;

  div {
    padding: 10px 20px;
  }
  .active {
    background: linear-gradient(
      270deg,
      rgba(51, 51, 51, 0.85) 40%,
      rgba(85, 85, 85, 1) 100%,
      transparent
    );
  }

  &.open {
    max-height: 180px;
  }
`;

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
  };
  const handleChildClick = (child) => {
    setSelectedChild(child);
  };

  return (
    <Container>
      <div className="hamburger-menu-icon" onClick={handleClick}>
        <AiOutlineMenuUnfold />
      </div>
      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
        <Link to="/admin">
          <Field
            onClick={() => handleChildClick("Field 1")}
            className={selectedChild === "Field 1" ? "active" : ""}
          >
            Đơn Đặt Bàn
          </Field>
        </Link>
        <Field onClick={() => setOpen(!open)}>Quản Lý Thực Đơn</Field>
        <ChildFields className={open ? "open" : ""}>
          <Link to="/admin/hots">
            <div
              onClick={() => handleChildClick("Child 1")}
              className={selectedChild === "Child 1" ? "active" : ""}
            >
              Đặc sản
            </div>
          </Link>
          <Link to="/admin/fasts">
            <div
              onClick={() => handleChildClick("Child 2")}
              className={selectedChild === "Child 2" ? "active" : ""}
            >
              Món ăn nhẹ
            </div>
          </Link>
          <Link to="/admin/mains">
            <div
              onClick={() => handleChildClick("Child 3")}
              className={selectedChild === "Child 3" ? "active" : ""}
            >
              Món chính
            </div>
          </Link>
          <Link to="/admin/drinks">
            <div
              onClick={() => handleChildClick("Child 4")}
              className={selectedChild === "Child 4" ? "active" : ""}
            >
              Nước
            </div>
          </Link>
        </ChildFields>
      </div>
    </Container>
  );
}

export default Sidebar;
