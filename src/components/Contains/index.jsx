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

const scrollToTop = () => {
  scroll.scrollToTop();
};
function Contents(props) {
  const [dataHot, setDataHot] = useState("");
  const [dataFast, setDataFast] = useState("");
  const [dataMain, setDataMain] = useState("");
  const [dataDrink, setDataDrink] = useState("");

  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, "hots"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDataHot(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    get(child(dbRef, "fasts"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDataFast(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    get(child(dbRef, "mains"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDataMain(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    get(child(dbRef, "drinks"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDataDrink(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //////////////////////////////////////////////call API with axios
  // useEffect(() => {
  //   const getFood = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://fake-db-hazel.vercel.app/Fasts"
  //       );
  //       setDataFast(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getFood();
  // }, []);
  // useEffect(() => {
  //   const getFood = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://fake-db-hazel.vercel.app/Hots"
  //       );
  //       setDataHot(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getFood();
  // }, []);
  // useEffect(() => {
  //   const getFood = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://fake-db-hazel.vercel.app/Mains"
  //       );
  //       setDataMain(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getFood();
  // }, []);
  // useEffect(() => {
  //   const getFood = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://fake-db-hazel.vercel.app/Drinks"
  //       );
  //       setDataDrink(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getFood();
  // }, []);

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
