import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../util/use-auth";
import styled from "styled-components";
import burger from "./assets/burger.svg";

const UserMenu = () => {
  const [isClicked, setIsClicked] = useState(false);

  const auth = useAuth();

  return (
    <div>
      {isClicked ? (
        <Container>
          <GridItem>
            <a>
              <svg
                width="50"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => setIsClicked(false)}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 12H4.75"
                ></path>
              </svg>
            </a>
          </GridItem>
          <GridItem>
            <Link to="/"> Home</Link>
          </GridItem>
          <GridItem>
            <Link to="/"> Bookings</Link>
          </GridItem>
          <GridItem>
            <Link to="/"> Add a Boat</Link>
          </GridItem>
          <GridItem>
            <Link to="/" onClick={() => auth.signout()}>
              {" "}
              Logout
            </Link>
          </GridItem>
        </Container>
      ) : (
        <Burger>
          <a>
            <svg
              id="burger-menu"
              width="50"
              height="50"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setIsClicked(true)}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 5.75H19.25"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 18.25H19.25"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 12H19.25"
              />
            </svg>
          </a>
        </Burger>
      )}
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const GridItem = styled.div`
  font-size: 15pt;
  height: 100px;
  width: auto;
  position: relative;
  align-content: center;
  text-align: center;
  margin-top: 20%;
`;
const Burger = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5%;
`;

export default UserMenu;
