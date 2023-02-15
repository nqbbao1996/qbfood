import { useCart } from "react-use-cart";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatPrice } from "../../utils";
import Login from "../Form/Login/Login";
import logo from "../../Logo/logo.png";
import { Link } from "react-router-dom";
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

function Cart({ login }) {
  const [showCart, setShowCart] = useState(false);
  const [springCart, setSpringCart] = useState(false);
  const [isShowFormLog, setIsShowFormLog] = useState(false);

  const show = () => {
    setShowCart(true);
  };
  const hide = () => {
    setShowCart(false);
  };

  const remove = (item) => {
    removeItem(item);
  };

  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    totalItems,
    emptyCart,
  } = useCart();

  useEffect(() => {
    setSpringCart(true);
    setTimeout(() => {
      setSpringCart(false);
    }, 200);
  }, [totalItems]);

  function writeNewPost(items) {
    const db = getDatabase();

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), "carts")).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[`carts/${newPostKey}`] = {
      ...items,
      id: newPostKey,
      Total: cartTotal,
      Status: "pending",
    };

    return update(ref(db), updates);
  }

  const handleSubmited = () => {
    writeNewPost(items)
      .then(() => {
        console.log("Post added successfully");
        alert("Thành Công");
        emptyCart();
      })
      .catch((error) => {
        console.error("Error adding post: ", error);
        alert("đặt món thất bại");
      });
  };

  const handelSumit = (event) => {
    event.preventDefault();
    if (items.length > 0) {
      handleSubmited();
      console.log(items);
    }
  };
  return (
    <Header>
      {login ? (
        <div
          className="login-button"
          onClick={() => {
            setIsShowFormLog(true);
          }}
        >
          Đăng Nhập
        </div>
      ) : (
        <Link to="/">
          <div className="login-button">Đăng Xuất</div>
        </Link>
      )}
      <Login
        isShow={isShowFormLog}
        onClose={() => {
          setIsShowFormLog(false);
        }}
      />
      <Link to="/">
        <img className="logo" src={logo} alt="Tên Quán Ăn" />
      </Link>
      <div className="cart-container" onMouseLeave={hide}>
        <div className="cart-icon" onMouseEnter={show}>
          <BsCart className={`cart-icon--icon ${springCart ? "spring" : ""}`} />
          <sup className="cart-icon--sub">{totalItems}</sup>
        </div>
        <div className="cart" style={{ display: showCart ? "block" : "none" }}>
          <h2>Thực Đơn</h2>
          <button className="hide-cart-button" onClick={hide}>
            &#9658;
          </button>
          {isEmpty ? (
            <p className="cart-empty">Bạn chưa chọn món ăn nào !</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="item">
                  <img src={item.img} alt="Item 1" />
                  <div className="item-name">
                    <h3>{item.title}</h3>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <div className="quantity">
                    <FaRegTrashAlt
                      className="quantity-remove"
                      onClick={() => remove(item.id)}
                    />
                    <div>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} />
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="confirm-purchase">
            <div className="total">Tổng cộng: {formatPrice(cartTotal)}</div>
            <button className="confirm-purchase-button" onClick={handelSumit}>
              Xác nhận đặt bàn
            </button>
          </div>
        </div>
      </div>
    </Header>
  );
}
export default Cart;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 8vh;
  z-index: 999;

  color: var(--color-white);
  background: linear-gradient(
    0deg,
    rgba(67, 67, 67) 20%,
    rgba(17, 17, 17) 100%
  );

  .login-button{
    cursor: pointer;
    :hover{
    color: floralwhite;
      
    }
  }
  .logo{
    height: 6vh;
    filter: hue-rotate(45deg);
  }


  .cart {
    position: fixed;
    top: 56px;
    right: 20px;
    width: 500px;
    max-height: 90vh;

    padding: 10px;
    margin: 0 auto;
    border-radius: 10px;

    background-color: #333;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 500;

    overflow-y: scroll;
    animation: slideIn 0.5s ease-out both;

    h2 {
      padding: 14px 20px;
    }

    .hide-cart-button {
      border: none;
      color: floralwhite;
      font-size: 30px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .cart-empty {
    padding: 20px;
    color: floralwhite;
    }
    ::-webkit-scrollbar {
      width: 4px;
      background-color: #333333;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #666666;
      border-radius: 10px;
    }

    @media screen and (max-width: 768px) {
      max-width: 100vw;
      max-height: 99vh;
      top: 6px;
      right: 0px;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #444;
    border-radius: 10px;
    position: relative;
    .item-name {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    :hover{
    background-color: #666;
    }
  }

  .item img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  .item h3 {
    margin: 0;
    font-size: 18px;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }

  .item p {
    margin: 0;
    font-size: 14px;
    color: gray;
  }

  .quantity {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: end;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }

  .quantity input[type="number"] {
    width: 30px;
    text-align: center;

    background-color: #444;
    color: white;
    border: 1px solid gray;
  }

  .quantity button {
    border: 1px solid gray;
    color: white;

    padding: 0 4px;
    cursor: pointer;
    :hover {
      background-color: #333;
    }
  }

  .quantity-remove {
    cursor: pointer;
    color: white;
    border: 0;
    border-radius: 5px;
    padding: 1px;
    width: 16px;
    height: 25px;
    :hover {
      background-color: #333;
    }
  }

  .cart-icon {

    color: white;
    padding: 10px 10px 10px 20px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100;

    .cart-icon--sub {
      border-radius: 20% 50%;
      padding: 8px 4px;
      background-color: white;
      color: #333;
      position: absolute;
      right: 20px;
      top: 20px;
    }

    .cart-icon--icon {
      width: 25px;
      height: 25px;
    }

    .spring {
      animation: spring 0.5s ease forwards;
    }
  }

  .confirm-purchase {
    display: flex;
    justify-content: space-between;
    .total {
      font-size: 16px;
      padding: 14px 20px;
      text-align: center;

      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    .confirm-purchase-button {
      background-color: #333;
      border: none;
      color: white;
      padding: 14px 20px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 10px;
      :hover {
        background-color: #444;
      }
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
  @keyframes spring {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.3);
    }
    60% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
}
`;
