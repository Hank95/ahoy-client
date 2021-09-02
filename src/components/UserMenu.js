import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../util/use-auth";
import styled from "styled-components";
import arrow from "./assets/arrow.svg";
import menu from "./assets/menu.svg";

const UserMenu = () => {
  const [isClicked, setIsClicked] = useState(false);

  const auth = useAuth();

  const handleClick = () => {
    setIsClicked(false);
  };

  return (
    <div>
      {isClicked ? (
        <Container>
          <Burger>
            <img src={arrow} alt="burger" onClick={handleClick} />
          </Burger>
          <GridItem>
            <Link to="/" onClick={handleClick}>
              {" "}
              Home
            </Link>
          </GridItem>
          <GridItem>
            <Link to="/" onClick={handleClick}>
              {" "}
              Bookings
            </Link>
          </GridItem>
          <GridItem>
            <Link to="/add-a-boat" onClick={handleClick}>
              {" "}
              Add a Boat
            </Link>
          </GridItem>
          <GridItem>
            <Link to="/my-boats" onClick={handleClick}>
              {" "}
              My Boats
            </Link>
          </GridItem>
          <GridItem>
            <Link
              to="/"
              onClick={() => {
                auth.signout();
                handleClick();
              }}
            >
              Logout
            </Link>
          </GridItem>
        </Container>
      ) : (
        <Burger>
          <img src={menu} alt="menu" onClick={() => setIsClicked(true)} />
        </Burger>
      )}
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  border-radius: 6px;
`;
const GridItem = styled.div`
  font-size: 15pt;
  padding: 10px;
  /* height: 100px; */
  width: auto;
  position: relative;
  align-content: center;
  text-align: center;
  border: 1px solid black;
  background-color: lightblue;
  &:hover {
    background-color: white;
  }
`;
const Burger = styled.div`
  /* display: flex;
  justify-content: flex-end; */
  margin: auto;
  margin-right: 50px;
`;

export default UserMenu;
