import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import { FaHome, FaStar } from "react-icons/fa";
import { MdFastfood, MdEmojiFoodBeverage } from "react-icons/md";
import { ImFire } from "react-icons/im";

function Menus(props) {
  return (
    <MenusPane>
      <MenuItem to="TopPage" name="Home" Icon={FaHome} />
      <MenuItem to="Hot" name="Đặc Sản" Icon={FaStar} />
      <MenuItem to="Fast" name="Ăn Vặt" Icon={MdFastfood} />
      <MenuItem to="Main" name="Món Chính" Icon={ImFire} />
      <MenuItem to="Water" name="Nước" Icon={MdEmojiFoodBeverage} />
    </MenusPane>
  );
}

export default React.memo(Menus);

const MenusPane = styled.div`
  position: fixed;
  left: 0;
  top: 16%;
  width: 46px;
  padding: 4px 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform-origin: left center;
  transition: all 0.3s linear;
  &:hover {
    width: 140px;
    background: rgba(0, 0, 0, 0.7);
  }

  .subMenu {
    display: flex;
    align-items: center;
    width: max-content;
    margin-left: 2px;
    padding: 4px 6px;
    cursor: pointer;
    .icon {
      font-size: 30px;
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      &:hover {
        color: #fff;
      }
    }
  }
`;
