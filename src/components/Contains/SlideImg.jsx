import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageSlider = () => {
  const images = [
    {
      id: 1,
      src: "https://pastaxi-manager.onepas.vn/content/uploads/articles/2amthuc/nhahang/top10quananngonkhonggiandep/top-10-nha-hang-ngon-co-khong-gian-dep-o-sai-gon-anh-6.jpg",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://sgl.com.vn/wp-content/uploads/2021/11/nha-hang-san-vuon-dep.jpg",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "https://www.vietnambooking.com/wp-content/uploads/2022/03/nhung-quan-co-view-dep-o-ha-noi-1-1.jpg",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "https://shopxaydung.vn/upload/data/images/tin-tuc/mau-thiet-ke/nha-hang-san-vuon-1-31.jpg",
      alt: "Image 4",
    },
    {
      id: 11,
      src: "https://pastaxi-manager.onepas.vn/content/uploads/articles/2amthuc/nhahang/top10quananngonkhonggiandep/top-10-nha-hang-ngon-co-khong-gian-dep-o-sai-gon-anh-6.jpg",
      alt: "Image 1",
    },
    {
      id: 12,
      src: "https://sgl.com.vn/wp-content/uploads/2021/11/nha-hang-san-vuon-dep.jpg",
      alt: "Image 2",
    },
    {
      id: 13,
      src: "https://www.vietnambooking.com/wp-content/uploads/2022/03/nhung-quan-co-view-dep-o-ha-noi-1-1.jpg",
      alt: "Image 3",
    },
    {
      id: 14,
      src: "https://shopxaydung.vn/upload/data/images/tin-tuc/mau-thiet-ke/nha-hang-san-vuon-1-31.jpg",
      alt: "Image 4",
    },
  ];

  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!pause) {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [pause]);

  const handleBack = () => {
    setIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <ContentsSection

    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    // }}
    >
      <h2 className="heading">Không Gian</h2>

      <InfoMoviesSlider
        // style={{ display: "flex", overflow: "hidden" }}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        {images
          .slice(index, index + 6)
          .concat(images.slice(0, 6 - (images.length - index)))
          .map((image, i) => (
            <div className="movieItem" key={i}>
              <img
                src={image.src}
                // style={{
                //   width: "420px",
                //   Height: "240px",
                //   transition: "all 0.3s ease-out",
                //   display: "inline-block",
                //   transition: "transform 0.5s ease",
                // }}
                // onMouseEnter={(e) => {
                //   e.target.style.transform = `scale(${1.4})`;
                //   e.target.style.zIndex = 100;
                // }}
                // onMouseLeave={(e) => {
                //   e.target.style.transform = `scale(${1})`;
                //   e.target.style.zIndex = 1;
                // }}
              />
            </div>
          ))}
      </InfoMoviesSlider>
      <button className="btnLeft" onClick={handleBack}>
        <FiChevronLeft />
      </button>
      <button className="btnRight" onClick={handleNext}>
        <FiChevronRight />
      </button>
    </ContentsSection>
  );
};
export default ImageSlider;

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
    margin-bottom: 4px;
    user-select: none;
    text-align: center;
  }
  .btnLeft {
    position: absolute;
    top: 40%;    
    left: 12px;
    transform: translateY(100%);
    z-index: 11;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0,0,0,0.4);
    
    svg {
      opacity: 0.7;
      font-size: 40px;
      transition: all 0.3s ease-out;
      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
  .btnRight {
    position: absolute;
    top: 40%;    
    right: 12px;
    transform: translateY(100%);
    z-index: 11;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0,0,0,0.4);
    
    svg {
      opacity: 0.7;
      font-size: 40px;
      transition: all 0.3s ease-out;
      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
`;

const InfoMoviesSlider = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(999, 400px);
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding: 48px 0px;

  scroll-behavior: smooth;

  .movieItem {
    transform: scale(1);
    width: 400px;
    height: 240px;
    transition: all 0.6s ease-out;
    user-select: none;
    overflow: hidden;
    border-radius: 6px;
    transform: center;

    &:hover {
      transform: scale(1.2, 1.4);
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
