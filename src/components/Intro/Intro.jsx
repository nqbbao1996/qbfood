import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { VscMute, VscUnmute } from "react-icons/vsc";

const API_KEY = "";

function Intro(props) {
  const [isMuted, setIsMuted] = useState(true);
  return (
    <IntroSection id="TopPage">
      <ReactPlayer
        playing={true}
        loop={true}
        width="100%"
        height="100%"
        volume={1}
        muted={isMuted}
        // url="https://vimeo.com/375868537"
        url="https://youtu.be/pq3Otf0zbdk"
        className="videoIntro"
      />
      <div className="infoIntro">
        <div className="infoIntro-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d39557.57633964328!2d106.6643072!3d10.810021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529111aa89f9d%3A0xd8f09cc0aa1b27f3!2zQ-G6o25nIGjDoG5nIGtow7RuZyBRdeG7kWMgdOG6vyBUw6JuIFPGoW4gTmjhuqV0!5e1!3m2!1svi!2s!4v1675670724716!5m2!1svi!2s"
            width="300"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <a
          className="infoIntro-direct"
          href="https://goo.gl/maps/1k1pdxLEeFMrMa9p7"
          target="_blank"
        >
          Xem chỉ đường
        </a>
        <p className="overview">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua"
        </p>
      </div>
      {isMuted ? (
        <VscMute
          className="btnVolume"
          onClick={() => setIsMuted((prev) => !prev)}
        />
      ) : (
        <VscUnmute
          className="btnVolume"
          onClick={() => setIsMuted((prev) => !prev)}
        />
      )}
      <div className="fadeBottom"></div>
    </IntroSection>
  );
}

export default React.memo(Intro);

const IntroSection = styled.header`
  background-color: var(--color-background);
  position: relative;
  padding-top: 56%;
  color: var(--color-white);

  @media screen and (max-width: 600px) {
    padding-top: 60%;
  }

  .videoIntro {
    position: absolute;
    top: 0;
    left: 0;
  }
  .infoIntro {
    display: flex;
    align-items: end;
    position: absolute;
    bottom: 150px;
    left: 8px;

    @media screen and (max-width: 1444px) {
      bottom: 120px;
    }
    @media screen and (max-width: 1280px) {
      bottom: 100px;
    }
    @media screen and (max-width: 1024px) {
      bottom: 80px;
    }
    @media screen and (max-width: 768px) {
      bottom: 60px;
    }
    @media screen and (max-width: 600px) {
      bottom: 50px;
    }
    .heading {
      font-size: 60px;
      transition: all 0.3s;
      @media screen and (max-width: 800px) {
        font-size: 40px;
      }
      @media screen and (max-width: 600px) {
        font-size: 24px;
      }
    }
    .infoIntro-map {
      display: block;
      @media screen and (max-width: 800px) {
        display: none;
      }
    }
    .infoIntro-direct {
      color: aquamarine;
      display: none;
      width: 200px;
      text-align: center;
      z-index: 200;
      @media screen and (max-width: 800px) {
        display: block;
      }
      @media screen and (max-width: 600px) {
        display: block;
        width: 100px;
        font-size: 14px;
        margin-left: 40px;
      }
    }
    .overview {
      width: 100%;
      max-width: 60vw;
      line-height: 1.3;
      padding-left: 25px;
      font-size: 18px;
      @media screen and (max-width: 800px) {
        font-size: 16px;
      }
      @media screen and (max-width: 600px) {
        font-size: 14px;
      }
    }
  }
  .fadeBottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 130px;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(15, 15, 15, 0.6) 40%,
      rgb(17, 17, 17),
      rgb(17, 17, 17)
    );
    @media screen and (max-width: 800px) {
      height: 100px;
    }
    @media screen and (max-width: 600px) {
      height: 60px;
    }
  }
  .btnVolume {
    position: absolute;
    height: 40px;
    width: 40px;
    right: 10%;
    top: 50%;
    cursor: pointer;
    border-radius: 50%;
    padding: 6px;
    color: #bbb;
    border: #fff solid 1px;
    transition: all 0.3s;
    transform: scale(1);
    &:hover {
      color: #fff;
      background-color: rgba(211, 211, 211, 0.178);
      transform: scale(1.2);
      transition: all 0.3s;
    }
    @media screen and (max-width: 800px) {
      height: 30px;
      width: 30px;
      padding: 4px;
    }
    @media screen and (max-width: 600px) {
      height: 20px;
      width: 20px;
      padding: 1px;
    }
  }
`;
