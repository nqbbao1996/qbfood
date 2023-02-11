import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-scroll";
import styled, { keyframes } from "styled-components";

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

const FormContainer = styled.div`
  position: fixed;
  top: 20vh;
  width: 600px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  z-index: 20;
`;
const Formbox = styled.form`
  background-color: var(--color-background);
  padding: 20px;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  .submit_btn {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }
`;

const FormItem = styled.div`
  display: flex;
  margin-bottom: 40px;
  width: 100%;
  .FormItem_input {
    flex: 1;
  }
`;

const Label = styled.label`
  width: 120px;
  font-weight: bold;
  margin: auto;
`;

const Input = styled.input`
  padding: 10px;
  background-color: #444;
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 5px;
  padding-left: 10px;
  position: absolute;
  font-style: italic;
`;

const SubmitButton = styled.button`
  color: floralwhite;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;

  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #444;
  }
`;
const CancelButton = styled.button`
  color: floralwhite;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #444;
  }
`;

function AddFood({ isShow, onClose, refetch }) {
  const param = useParams();
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    price: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    img: "",
    price: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = "bạn chưa nhập tên món";
    }
    if (!formData.img) {
      newErrors.img = "bạn chưa nhập địa chỉ ảnh";
    }
    if (!formData.price) {
      newErrors.price = "bạn chưa nhập giá";
    }
    return newErrors;
  };

  const acceptAddMusic = async () => {
    setIsSubmitting(true);
    try {
      const result = await axios({
        url: `http://localhost:3004/${param.id}`,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200 || result.status === 201) {
        refetch();
        onClose();
      }
    } catch (error) {
      alert("Thêm món thất bại");

      console.log(error);
    }
    setIsSubmitting(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      acceptAddMusic();
    }
  };

  const formChecker = Object.values(errors).some(Boolean);

  return (
    <>
      <Formbackground
        onClick={() => onClose()}
        style={{ display: isShow ? "block" : "none" }}
      ></Formbackground>
      <FormContainer>
        <Formbox onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="title">Tên món:</Label>
            <div className="FormItem_input">
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
            </div>
          </FormItem>
          <FormItem>
            <Label htmlFor="img">hình ảnh</Label>
            <div className="FormItem_input">
              <Input
                type="url"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
              />
              {errors.img && <ErrorMessage>{errors.img}</ErrorMessage>}
            </div>
          </FormItem>
          <FormItem>
            <Label htmlFor="price">Giá</Label>
            <div className="FormItem_input">
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
            </div>
          </FormItem>
          <FormItem>
            <Label htmlFor="description">Mô tả</Label>
            <div className="FormItem_input">
              <Input
                type="description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </FormItem>
          <div className="submit_btn">
            <CancelButton
              type="string"
              onClick={() => {
                onClose();
              }}
            >
              Hủy bỏ
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Xác nhận
            </SubmitButton>
          </div>
        </Formbox>
      </FormContainer>
    </>
  );
}

export default AddFood;