import React from "react";
import { useStateValue } from "../../state/stateContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuComponent = styled.div`
  display: inline-block;
  background-color: #fff;
  nav {
  }
  a {
    display: flex;
    height: 50px;
    font-family: "Montserrat", sans-serif;
    color: #000;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
`;

// const LogoutButton = styled.div`
//   width: 100%;
//   cursor: pointer;
//   padding: 10px;
// `;

const UserStatus = styled.div`
  position: absolute;
  bottom: 0;
`;

const NavMenu = styled.nav`
  margin: 50% 50px 0 50px;
`;

const LogoutButton = styled.div`
  /* width: 100%; */
  cursor: pointer;
  /* padding: 10px; */
  /* float: left; */
  /* height: 20px; */
  height: 50px;
  font-family: "Montserrat", sans-serif;
  color: #000;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-top: 1.2em;
`;

export const SideMenu = () => {
  const [globalState, dispatch] = useStateValue();

  return (
    <MenuComponent>
      <NavMenu>
        <Link to="/dashboard/create-new-poll">Create New Poll</Link>
        <Link to="/dashboard/polls">Polls</Link>
        <Link to="/dashboard/songs">Songs</Link>
        <Link to="/dashboard/votes">Votes</Link>
        <Link to="/dashboard/stats">Stats</Link>
        <Link to="/dashboard/users">Users</Link>
      </NavMenu>
      <LogoutButton
        onClick={(e: any) => {
          sessionStorage.removeItem("auth");
          dispatch({ type: "setAuth", payload: undefined });
        }}
      >
        logout
      </LogoutButton>
    </MenuComponent>
  );
};
