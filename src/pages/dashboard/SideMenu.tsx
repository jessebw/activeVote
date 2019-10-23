import React from "react";
import { useStateValue } from "../../state/stateContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuComponent = styled.div`
  display: inline-block;
  background-color: orange;
  nav {
  }
  a {
    display: block;
  }
`;

export const SideMenu = () => {
  const [globalState, dispatch] = useStateValue();

  return (
    <MenuComponent>
      <button
        onClick={(e: any) => {
          sessionStorage.removeItem("auth");
          dispatch({ type: "setAuth", payload: undefined });
        }}
      >
        logout
      </button>
      <div>
        The user is <b>{globalState.auth ? "currently" : "not"}</b> logged in.
      </div>
      <nav>
        <Link to="/dashboard/create-new-poll">Create New Poll</Link>
        <Link to="/dashboard/polls">Polls</Link>
        <Link to="/dashboard/songs">Songs</Link>
        <Link to="/dashboard/votes">Votes</Link>
        <Link to="/dashboard/stats">Stats</Link>
        <Link to="/dashboard/users">Users</Link>
      </nav>
    </MenuComponent>
  );
};
