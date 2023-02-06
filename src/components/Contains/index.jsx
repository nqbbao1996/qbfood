import React, { useEffect } from "react";
import MusicsRow from "./MusicRow";
import { FaArrowAltCircleUp } from "react-icons/fa";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
// import { useDispatch, useSelector } from "react-redux";
// import * as ACTIONS from "../../store/actions";
import { useScroll } from "../../hooks";
import axios from "axios";
import { useState } from "react";

const scrollToTop = () => {
  scroll.scrollToTop();
};
function Contents(props) {
  const [dataHot, setDataHot] = useState("");
  const [dataFast, setDataFast] = useState("");
  const [dataMain, setDataMain] = useState("");
  const [dataDrink, setDataDrink] = useState("");

  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await axios.get(
          "https://fake-db-hazel.vercel.app/Fasts"
        );
        setDataFast(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFood();
  }, []);
  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await axios.get(
          "https://fake-db-hazel.vercel.app/Hots"
        );
        setDataHot(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFood();
  }, []);
  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await axios.get(
          "https://fake-db-hazel.vercel.app/Mains"
        );
        setDataMain(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFood();
  }, []);
  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await axios.get(
          "https://fake-db-hazel.vercel.app/Drinks"
        );
        setDataDrink(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFood();
  }, []);

  const acceptAddMusic = async () => {
    try {
      const result = await axios({
        url: `https://fake-db-hazel.vercel.app/comments`,
        method: "post",
        data: dataPost,
      });
      if (result.status === 200) {
        alert("Thêm logo thành công");
      }
    } catch (error) {
      alert("Thêm logo thất bại");
      console.log(error);
    }
  };
  const acceptDelMusic = async () => {
    try {
      const result = await axios({
        url: `https://fake-db-hazel.vercel.app/comments/t5eDzi4`,
        method: "delete",
      });
      if (result.status === 200) {
        alert("Thêm logo thành công");
      }
    } catch (error) {
      alert("Thêm logo thất bại");
      console.log(error);
    }
  };
  const acceptFixMusic = async () => {
    try {
      const result = await axios({
        url: `http://localhost:3004/comments/MIKWScM`,
        method: "patch",
        data: dataPatch,
      });
      if (result.status === 200) {
        alert("Thêm logo thành công");
      }
    } catch (error) {
      alert("Thêm logo thất bại");
      console.log(error);
    }
  };
  const [scrollDimensions] = useScroll();

  return (
    <div>
      <MusicsRow movies={dataHot} title="Đặc Sản" idSection="Hot" />
      <MusicsRow movies={dataFast} title="Món Ăn Nhẹ" idSection="Fast" />
      <MusicsRow movies={dataMain} title="Món Chính" idSection="Main" />
      <MusicsRow movies={dataDrink} title="Nước" idSection="Water" />
      <GoToTop
        onClick={() => scrollToTop()}
        style={{
          visibility: `${
            scrollDimensions.scrollY > 800 ? "visible" : "hidden"
          }`,
        }}
      >
        <FaArrowAltCircleUp />
      </GoToTop>
    </div>
  );
}

export default React.memo(Contents);

const GoToTop = styled.div`
  position: fixed;
  z-index: 10;
  right: 70px;
  bottom: 50px;
  font-size: 50px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  @media screen and (max-width: 600px) {
    right: 40px;
  }
`;
