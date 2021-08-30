import styled from "styled-components";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../util/use-auth";

const NavBar = () => {
  const auth = useAuth();

  function handleLogoutClick() {
    auth.signout();

    // fetch("/logout", { method: "DELETE" }).then((r) => {
    //   if (r.ok) {
    //     setUser(null);
    //   }
    // });
  }

  //   let location = useLocation();
  return (
    <Container>
      <NavLink to="/">
        <h1>AHOY</h1>
      </NavLink>

      {!auth.user ? (
        <Nav>
          <NavButton as={Link} to="/login">
            Login/Signup
          </NavButton>
        </Nav>
      ) : (
        <Nav>
          <NavButton as={Link} to="/listings ">
            Boats
          </NavButton>

          <NavButton as={Link} to="/" onClick={handleLogoutClick}>
            Log Out
          </NavButton>
        </Nav>
      )}
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: 150px;
  border-bottom: 4px solid rgb(47, 98, 104);
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 50px;
  right: 20px;
`;

const NavButton = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  text-decoration: none;
  a {
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    box-shadow: 0px 0px 15px 0px #848484;
  }
`;

export default NavBar;
