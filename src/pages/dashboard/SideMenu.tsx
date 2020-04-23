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
  /* background-color: #636363; */
  flex: 0 0 auto;
  nav {
  }
  a {
    display: flex;
    height: 50px;
    font-family: "Montserrat", sans-serif;
    color: #000;
    /* text-align: left; */
    /* align-items: center; */
    /* justify-content: center; */
    text-decoration: none;
  }
`;

const NavMenu = styled.nav`
  margin: 50% 50px 0 50px;
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
  display: none;
`;

{
  /* trying to pass users email up to show on the dashboard */
}
export const SideMenu = (props: { currentUser: any }) => {
  const [globalState, dispatch] = useGlobalState();

  return (
    <MenuComponent>
      <NavMenu>
        <NavLink to="/dashboard/results/:pollId">
          {/* <BsBarChartFill style={{ width: "25px", height: "25px" }} /> */}
          <MdShowChart style={{ width: "25px", height: "25px" }} />
          <NavText>DASHBOARD</NavText>
        </NavLink>
        <NavLink activeClassName="active" to="/dashboard/create-new-poll">
          <BsPlus style={{ width: "25px", height: "25px" }} />
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
            style={{ width: "25px", height: "25px" }}
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
          <BsListUl style={{ width: "25px", height: "25px" }} />
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
          <BsPeople style={{ width: "25px", height: "25px" }} />
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
          {/* trying to pass users email up to show on the dashboard */}
          {console.log(props.currentUser.email)}
          {props.currentUser.email}
          {globalState.auth ? " currently" : " not"}
        </b>{" "}
        logged in.
      </UserStatus>
    </MenuComponent>
  );
};
