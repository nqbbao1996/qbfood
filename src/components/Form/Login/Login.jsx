import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

function FormLog({ isShow, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username) {
      setErrorMessage("Bạn chưa nhập tài khoản");
    } else if (username.length < 4) {
      setErrorMessage("Tài khoản có ít nhất 4 kí tự");
    } else if (!password) {
      setErrorMessage("Bạn chưa nhập mật khẩu");
    } else if (password.length < 4) {
      setErrorMessage("Mật khẩu có ít nhất 4 kí tự");
    } else {
      navigate("/admin");
      onClose();
    }
  };

  const handleUsernameBlur = () => {
    if (!username) {
      setErrorMessage("Bạn chưa nhập tài khoản");
    } else if (username.length < 4) {
      setErrorMessage("Tài khoản có ít nhất 4 kí tự");
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setErrorMessage("bạn chưa nhập mật khẩu");
    } else if (password.length < 4) {
      setErrorMessage("Mật khẩu có ít nhất 4 kí tự");
    }
  };

  return (
    <>
      <Formbackground
        style={{ display: isShow ? "block" : "none" }}
        onClick={() => {
          onClose();
        }}
      ></Formbackground>
      <Formbox style={{ display: isShow ? "contents" : "none" }}>
        <div className="box">
          <form onSubmit={handleSubmit} className="form">
            <h2>Đăng Nhập</h2>
            <div className="inputBox">
              <input
                required
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMessage("");
                }}
                onBlur={handleUsernameBlur}
              />
              <span>Tên Đăng Nhập</span> <i></i>
            </div>
            <div className="inputBox">
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                onBlur={handlePasswordBlur}
              />
              <span>Mật Khẩu</span> <i></i>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="links">
              <a href="#">Quên mật khẩu?</a>
              <a href="#">Đăng ký</a>
            </div>
            <div className="sub-button">
              <p
                type="text"
                onClick={() => {
                  onClose();
                }}
                className="cancel"
              >
                Hủy bỏ
              </p>
              <input type="submit" value="Đăng Nhập" className="c" />
            </div>
          </form>
        </div>
      </Formbox>
    </>
  );
}

export default FormLog;
const fadeIn = keyframes`
  0% { background: rgba(0, 0, 0, 0);}
  100% { background: rgba(0, 0, 0, 0.6); }
`;

const Formbackground = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 1s cubic-bezier(0.17, 0.85, 0.45, 1) forwards;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Formbox = styled.div`
  .box {
    z-index: 40;
    position: fixed;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%);
    width: 380px;
    height: 400px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
  }
  .box::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
  }
  .box::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .form {
    position: absolute;
    inset: 2px;
    border-radius: 8px;
    background-color: #28292d;
    z-index: 10;
    padding: 30px;
    display: flex;
    flex-direction: column;
  }
  .form h2 {
    color: #45f3ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
    margin-bottom: 10px;
  }
  .inputBox {
    position: relative;
    width: 300px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  .inputBox input {
    position: relative;
    width: 100%;
    padding: 10px 0px 10px 10px;
    background: transparent;
    border: none;
    outline: none;
    color: #23242a;
    font-size: 16px;
    letter-spacing: 0.05em;
    z-index: 10;
  }
  .inputBox span {
    position: absolute;
    left: 0;
    padding: 10px 0px;
    font-size: 1em;
    color: #8f8f8f;
    pointer-events: none;
    letter-spacing: 0.05em;
    transition: 0.5s;
  }
  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    color: #45f3ff;
    transform: translate(0px) translateY(-50px);
    font-size: 0.9em;
  }
  .inputBox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #45f3ff;
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
  }
  .inputBox input:valid ~ i,
  .inputBox input:focus ~ i {
    height: 44px;
  }
  .links {
    display: flex;
    justify-content: space-between;
  }
  .links a {
    position: relative;
    font-size: 1em;
    color: #8f8f8f;
    text-decoration: none;
    margin-top: 20px;
  }
  .links a:hover {
    color: #45f3ff;
    cursor: no-drop;
  }
  input[type="submit"] {
    border: none;
    outline: none;
    padding: 10px;
    width: 100px;
    margin-top: 20px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s ease;
    background: #2ebac4;

    :hover {
      background: #45f3ff;
      color: #8f8f8f;
    }
  }
  .sub-button {
    display: flex;
    justify-content: space-between;
  }
  .cancel {
    padding: 11px 0px;
    position: relative;
    font-size: 1em;
    color: #8f8f8f;
    text-decoration: none;
    margin-top: 20px;
    cursor: Pointer;
    :hover {
      color: #45f3ff;
    }
  }
`;
