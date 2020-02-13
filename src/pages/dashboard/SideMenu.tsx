import React from "react";
import { useGlobalState } from "../../state/stateContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserStatus } from "../../components/StyledComponents";

const MenuComponent = styled.div`
  display: inline-block;
  background-color: #fff;
  flex: 0 0 auto;
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

const NavMenu = styled.nav`
  margin: 50% 50px 0 50px;
`;

const LogoutButton = styled.div`
  cursor: pointer;
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
  const [globalState, dispatch] = useGlobalState();

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
      <UserStatus>
        Status: <b>{globalState.auth ? "currently" : "not"}</b> logged in.
      </UserStatus>
    </MenuComponent>
  );
};
