import React, { useState } from "react";
import styled from "styled-components";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const FormContainer = styled.form`
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    position: fixed;
    top: 20vh;
    right: 50%;
    transform: translateX(50%);
  `;

  const FormLabel = styled.label`
    color: #fff;
  `;

  const FormInput = styled.input`
    background-color: #444;
    color: #fff;
    padding: 10px;
  `;

  const FormButton = styled.button`
    background-color: #555;
    color: #fff;
    padding: 10px;
  `;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <FormLabel htmlFor="phone">Phone:</FormLabel>
        <FormInput
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <FormButton type="submit">Submit</FormButton>
    </FormContainer>
  );
};

export default ContactForm;
