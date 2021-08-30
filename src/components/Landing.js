import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Landing = ({ handleSearch, user }) => {
  const [landingSearch, setLandingSearch] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(landingSearch);
    if (user) {
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            autoComplete="off"
            value={landingSearch}
            onChange={(e) => setLandingSearch(e.target.value)}
          />
        </FormField>
        <FormField>
          <Button type="submit">Search</Button>
        </FormField>
      </form>
    </div>
  );
};

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;
const Input = styled.input`
  /* border-radius: 6px; */
  border: 1px solid transparent;
  border-color: #dbdbdb;
  -webkit-appearance: none;
  max-width: 100%;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
`;
const Button = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  border: 1px solid transparent;
  /* border-radius: 6px; */
  padding: 8px 16px;
  text-decoration: none;
  width: 100%;
  background-color: rgba(0, 57, 7, 0.5);
  display: flex;
  justify-content: center;
  align-self: center;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default Landing;
