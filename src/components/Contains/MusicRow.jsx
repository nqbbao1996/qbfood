import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SmoothHorizontalScrolling } from "../../utils";
import { useViewport } from "../../hooks";
import MovieDetailsPages from "../MovieDetails/temp";
import { useCart } from "react-use-cart";

function MusicsRow(props) {
  const { movies, title, isNetflix, idSection } = props;
  const sliderRef = useRef();
  const itemRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [movie, setMovie] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [windowDimensions] = useViewport();
  const { addItem } = useCart();

  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft)
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        itemRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
  };

  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0)
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -(itemRef.current.clientWidth * 2),
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

  const handleSelectMovie = (movie) => {
    setMovie(movie);
    setIsShowDetail(true);

    console.log(movie);
    console.log(isShowDetail);
  };

  return (
    <>
      <MoviesRowSection draggable="false" id={idSection}>
        <h1 className="heading">{title}</h1>
        <MoviesSlider
          ref={sliderRef}
          draggable="true"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
          style={
            movies && movies.length > 0
              ? {
                  gridTemplateColumns: `repeat(${movies.length}, ${
                    windowDimensions.width > 1200
                      ? "360px"
                      : windowDimensions.width > 992
                      ? "300px"
                      : windowDimensions.width > 768
                      ? "250px"
                      : windowDimensions.width > 600
                      ? "200px"
                      : "180px"
                  })`,
                }
              : {}
          }
        >
          {movies &&
            movies.length > 0 &&
            movies.map((movie, index) => {
              return (
                <div
                  className="movieItem"
                  draggable="false"
                  ref={itemRef}
                  key={movie.id}
                >
                  <img
                    src={movie.img}
                    alt=""
                    draggable="false"
                    onDragStart={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => handleSelectMovie(movie)}
                  />
                  <div
                    className="movieName"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    {movie.title || movie.name}
                  </div>
                  <div className="addbtn">
                    <button onClick={() => addItem(movie)}>+</button>
                  </div>
                </div>
              );
            })}
          <div></div>
        </MoviesSlider>
        <div
          className={`btnLeft ${isNetflix && "isNetflix"}`}
          onClick={handleScrollLeft}
        >
          <FiChevronLeft />
        </div>
        <div
          className={`btnRight ${isNetflix && "isNetflix"}`}
          onClick={handleScrollRight}
        >
          <FiChevronRight />
        </div>
      </MoviesRowSection>
      {isShowDetail && (
        <MovieDetailsPages
          movie={movie}
          isShowModal={isShowDetail}
          onClose={() => setIsShowDetail(false)}
        />
      )}
    </>
  );
}

export default React.memo(MusicsRow);

const MoviesRowSection = styled.section`
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
    user-select: none;
  }
  .btnLeft {
    position: absolute;
    top: 50%;
    transform: translateY(-20%);
    left: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 40px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }
    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s ease-out;
    }
    &.isNetflix {
      height: 100px;
      width: max-content;
    }
    @media screen and (max-width: 600px) {
      height: 40px;
      width: 30px;
    }
  }
  .btnRight {
    position: absolute;
    top: 50%;
    right: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 40px;
    transform: translateY(-20%);
    display: flex;
    align-items: center;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }
    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s ease-out;
    }
    &.isNetflix {
      height: 100px;
      width: max-content;
    }
    @media screen and (max-width: 600px) {
      height: 40px;
      width: 30px;
    }
  }
`;

const MoviesSlider = styled.div`
  display: grid;
  gap: 6px;
  transition: all 0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 20px;

  scroll-behavior: smooth;
  &:hover .movieItem {
    opacity: 0.5;
  }

  .movieItem {
    transform: scale(1);
    max-width: 400px;
    max-height: 240px;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-out;

    overflow: hidden;
    border-radius: 6px;
    transform: center left;
    position: relative;
    cursor: Pointer;

    &:hover {
      opacity: 1;
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
    .movieName {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 4px;
      background-color: rgba(0, 0, 0, 0.65);
      text-align: center;
      font-size: 14px;
    }
    .addbtn {
      color: greenyellow;
      z-index: 100;
      position: absolute;
      right: 10px;
      top: 0;
      padding: 2px 4px;
      background-color: rgba(0, 0, 0, 0.65);
      text-align: center;
      font-size: 20px;
    }
  }
`;
