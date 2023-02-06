import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { SmoothHorizontalScrolling } from "../../utils";

function Contents(props) {
  const sliderRef = useRef();
  const itemRef = useRef();

  const [dragUp, setDragUp] = useState(0);
  const [mouseLeave, setMouseLeave] = useState(false);
  const [data, setData] = useState("");

  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://fake-db-hazel.vercel.app/abouts"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft)
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        itemRef.current.clientWidth,
        sliderRef.current.scrollLeft
      );
  };

  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0)
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -itemRef.current.clientWidth,
        sliderRef.current.scrollLeft
      );
  };

  useEffect(() => {
    if (isDrag) {
      if (dragMove < dragDown) handleScrollRight();
      if (dragMove > dragDown) handleScrollLeft();
    }
  }, [dragDown, dragMove, isDrag]);

  const onDragStart = (e) => {
    setDragDown(e.screenX);
    setIsDrag(true);
  };
  const onDragEnd = (e) => {
    setIsDrag(false);
  };
  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };

  return (
    <ContentsSection draggable="false">
      <h1 className="heading">Đặc Sản</h1>
      <InfoMoviesSlider
        ref={sliderRef}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
      >
        {data.length > 0 &&
          data.map((movie, index) => (
            <div
              key={index}
              className="movieItem"
              draggable="false"
              ref={itemRef}
            >
              <img
                src={movie.img}
                alt=""
                draggable="false"
                onDragStart={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          ))}
      </InfoMoviesSlider>

      <div className="btnLeft" onClick={handleScrollLeft}>
        <FiChevronLeft />
      </div>
      <div className="btnRight" onClick={handleScrollRight}>
        <FiChevronRight />
      </div>
    </ContentsSection>
  );
}

export default React.memo(Contents);

const ContentsSection = styled.section`
  background-color: var(--color-background);
  color: var(--color-white); 
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
  position: relative;
  width: 100%;
  height: 100%;    
  .heading {
    font-size: 18px;
    margin-bottom: 12px;
    user-select: none;
  }
  .btnLeft {
    position: absolute;
    top: 50%;    
    left: 12px;
    transform: translateY(100%);
    z-index: 11;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0,0,0,0.4);
    
    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s ease-out;
      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
  .btnRight {
    position: absolute;
    top: 50%;    
    right: 12px;
    transform: translateY(100%);
    z-index: 11;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0,0,0,0.4);
    
    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s ease-out;
      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
`;

const InfoMoviesSlider = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(22, 400px);
  transition: all 0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 28px;
  scroll-behavior: smooth;

  .movieItem {
    transform: scale(1);
    width: 400px;
    height: 240px;
    transition: all 0.3s ease-out;
    user-select: none;
    overflow: hidden;
    border-radius: 6px;
    transform: center;

    &:hover {
      transform: scale(1.1);
      z-index: 10;
      -webkit-filter: brightness(1) !important;
      filter: brightness(1) !important;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
