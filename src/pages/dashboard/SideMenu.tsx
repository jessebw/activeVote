import React from "react";
import { useGlobalState } from "../../state/stateContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserStatus } from "../../components/StyledComponents";
import ReactGA from "react-ga";
import {
  BsBarChartFill,
  BsPlus,
  BsListUl,
  BsReverseLayoutSidebarReverse,
  BsPeople,
} from "react-icons/bs";
import { MdShowChart } from "react-icons/md";
import { IUser } from "../../interfaces";

const MenuComponent = styled.div`
  display: inline-block;
  flex: 0 0 auto;
  nav {
  }
  a {
    display: flex;
    height: 50px;
    font-family: "Montserrat", sans-serif;
    color: rgba(0, 0, 0, 0.6);
    text-align: center;
    text-decoration: none;
  }
`;

const NavMenu = styled.nav`
  display: block;
  .active {
    font-weight: bold;
    color: dodgerblue;
  }
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

const NavText = styled.div`
  width: 100%;
`;

export const SideMenu = (props: { currentUser: any }) => {
  const [globalState, dispatch] = useGlobalState();

  return (
    <MenuComponent>
      <NavMenu>
        <NavLink to="/dashboard/results/:pollId">
          <MdShowChart
            style={{ width: "35px", height: "35px", color: "#000" }}
          />
          <NavText>STATS</NavText>
        </NavLink>

        <NavLink activeClassName="active" to="/dashboard/create-new-poll">
          <BsPlus
            style={{
              width: "35px",
              height: "35px",
              color: "#000",
              margin: "0 auto",
            }}
          />
          <NavText>ADD NEW POLL</NavText>
        </NavLink>
        <NavLink
          to="/dashboard/polls"
          onClick={(e: any) => {
            ReactGA.event({
              category: "Admin",
              action: "Nav to polls view",
            });
          }}
        >
          <BsReverseLayoutSidebarReverse
            style={{ width: "35px", height: "35px", color: "#000" }}
          />
          <NavText>ALL POLLS</NavText>
        </NavLink>
        <NavLink
          to="/dashboard/songs"
          onClick={(e: any) => {
            ReactGA.event({
              category: "Admin",
              action: "Nav to Songs view",
            });
          }}
        >
          <BsListUl style={{ width: "35px", height: "35px", color: "#000" }} />
          <NavText>POLL ITEMS</NavText>
        </NavLink>
        <NavLink
          to="/dashboard/users"
          onClick={(e: any) => {
            ReactGA.event({
              category: "Admin",
              action: "Nav to users view",
            });
          }}
        >
          <BsPeople style={{ width: "35px", height: "35px", color: "#000" }} />
          <NavText>USERS</NavText>
        </NavLink>
      </NavMenu>
      <LogoutButton
        onClick={(e: any) => {
          ReactGA.event({
            category: "Admin",
            action: "Logged out",
          });
          sessionStorage.removeItem("auth");
          dispatch({ type: "setAuth", payload: undefined });
        }}
      >
        LOGOUT
      </LogoutButton>
      <UserStatus>
        Status:{" "}
        <b>
          {console.log(props.currentUser.email)}
          {props.currentUser.email}
          {globalState.auth ? " currently" : " not"}
        </b>{" "}
        logged in.
      </UserStatus>
    </MenuComponent>
  );
};
