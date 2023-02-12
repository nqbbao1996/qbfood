import React, { useState } from "react";
import { MdClose } from "react-icons/md";

import styled, { keyframes } from "styled-components";
import { useCart } from "react-use-cart";
import { formatPrice } from "../../utils";

function MovieDetailsPage(props) {
  const { movie, isShowModal, onClose } = props;
  const { addItem } = useCart();

  return (
    <MovieDetailsWrapper>
      <div
        className={`backdrop ${isShowModal ? "showBackdrop" : "hideBackdrop"}`}
        onClick={onClose}
      ></div>

      <div
        className={`modal ${isShowModal ? "showModal" : "hideModal"}`}
        style={
          movie
            ? {
                backgroundImage: `url(${movie.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      ></div>
      <div className="modal">
        <div className="container">
          <div className="infoMovie">
            <h1 className="title">Tên Món: {movie.title}</h1>
            <p className="rating">Giá: {formatPrice(movie.price)} </p>
            {movie.description ? (
              <div className="description">
                <p className="episode">Mô tả: </p>
                <span className="overview">{movie.description}.</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <MdClose className="closeBtn" onClick={onClose} />
        </div>
        <div
          className="addbtn"
          onClick={() => {
            addItem(movie);
            {
              onClose();
            }
          }}
        >
          <button>+</button>
        </div>
      </div>
    </MovieDetailsWrapper>
  );
}

export default MovieDetailsPage;
const fadeIn = keyframes`
  0% { background: rgba(0, 0, 0, 0);}
  100% { background: rgba(0, 0, 0, 0.6); }
`;
const MovieDetailsWrapper = styled.div`
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.6);
    animation: ${fadeIn} 1s cubic-bezier(0.17, 0.85, 0.45, 1) forwards;
  }
  .showBackdrop {
    display: block;
  }
  .hideBackdrop {
    display: none;
  }

  .modal {
    position: fixed;

    top: 15%;
    left: 0;
    z-index: 500;
    width: 100%;
    height: 70vh;
    margin: 0 auto;
    color: #fff;
    opacity: 1;
    box-shadow: 0 15px 40px rgba(var(--color-dark), 0.2);
    transition: all 0.5s ease-out;

    .container {
      position: relative;
      width: 40%;
      height: 100%;

      background: linear-gradient(90deg, rgba(0, 0, 0, 0.94) 60%, transparent);

      @media only screen and (max-width: 1184px) {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.95) 40%,
          rgba(0, 0, 0, 0.733),
          transparent
        );
      }
      @media only screen and (max-width: 980px) {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.95) 50%,
          transparent
        );
        width: 100%;
        height: unset;
      }
      @media only screen and (max-width: 600px) {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.88) 60%,
          transparent
        );
      }

      .infoMovie {
        text-align: center;
        width: 60%;
        height: 100%;

        padding-left: 20px;
        padding-top: 40px;
        padding-bottom: 20px;
        color: #fff;
        font-size: 20px;
        @media only screen and (max-width: 980px) {
          width: 95%;
        }
        @media only screen and (max-width: 600px) {
          font-size: 16px;
          width: 95%;
        }
        .title {
          margin-top: 10px;
        }
        .episode {
          display: inline;
        }
        .description {
          margin-top: 30px;
          text-align: justify;
          @media only screen and (max-width: 980px) {
            margin-top: 10px;

            width: 95%;
          }
        }
        .overview {
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
          font-size: 18px;
          @media only screen and (max-width: 600px) {
            font-size: 14px;
          }
        }
      }

      .closeBtn {
        position: absolute;
        top: 10px;
        left: 16px;
        width: 30px;
        height: 30px;
        padding: 2px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        color: rgba(255, 255, 255, 0.6);
        cursor: Pointer;
        transform: scale(1);
        transition: all 0.3s ease;
        &:hover {
          transform: scale(1.1);
          color: rgba(255, 255, 255, 0.95);
          background-color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
  .showModal {
    transform: scale(1);
    top: 15%;
    opacity: 1;
    left: 0;
    visibility: visible;
    transition: all 0.5s ease-out;
  }
  .hideModal {
    transform: scale(0);
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease-out;
  }
  .addbtn {
    color: greenyellow;
    z-index: 100;
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 0px;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.65);
    text-align: center;
    font-size: 30px;
    transform: scale(1);
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
      color: rgba(255, 255, 255, 0.95);
      background-color: rgba(255, 255, 255, 0.4);
      top: 2px;
    }
  }
`;
