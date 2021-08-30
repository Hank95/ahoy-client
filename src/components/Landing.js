import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../util/use-auth";

const Landing = ({ handleSearch }) => {
  const [landingSearch, setLandingSearch] = useState(null);

  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(landingSearch);
    if (auth.user) {
      history.push("/listings");
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="username">Where are we going?</Label>
            <Input
              type="text"
              id="search"
              autoComplete="off"
              value={landingSearch}
              onChange={(e) => setLandingSearch(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button type="submit">Search</Button>
          </FormField>
        </form>
      </Container>
    </div>
  );
};

const Container = styled.div`
  margin: 20vh auto;
  max-width: 700px;
`;

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
