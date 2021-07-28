import React, { useState } from "react";
import { useGlobalState } from "../../state/stateContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserStatus } from "../../components/StyledComponents";
import ReactGA from "react-ga";

import {
  BsPlus,
  BsListUl,
  BsBookmarkDash,
  BsPerson,
  BsXCircle,
} from "react-icons/bs";

import { TiTick } from "react-icons/ti";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaTachometerAlt } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { GoGraph } from "react-icons/go";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const MenuComponent = styled.div`
  background-color: #1d1d1d;
  padding-left: 10px;
  padding-top: 50px;

  a {
    display: flex;
    height: 50px;
    font-family: "Montserrat", sans-serif;
    color: rgba(255, 255, 255, 0.5);
    // color: #fff;
    text-align: left;
    text-decoration: none;
    line-height: 2.3em;
  }
`;

const NavMenu = styled.nav`
  .active {
    font-weight: bold;
    // color: dodgerblue;
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

`;

export const SideMenu = (props: { currentUser: any }) => {
  const [globalState, dispatch] = useGlobalState();
  const [toggleVisible, setToggleVisible] = useState<boolean>(true);
  const [signOutVisible, setSignOutVisible] = useState<boolean>(true);

  return (
    <MenuComponent>
      <ProSidebar collapsed={true} width="auto">
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <NavMenu>
            <Menu iconShape="circle">
              <span
                onClick={(e: any) => {
                  setToggleVisible(!toggleVisible);
                }}
              >
                <MenuItem icon={<FaTachometerAlt />}>
                  {!toggleVisible ? (
                    <HiOutlineChevronRight
                      style={{
                        fontSize: "2em",
                        position: "absolute",
                      }}
                    />
                  ) : (
                    <NavText>
                      Dashboard
                      <HiOutlineChevronLeft
                        style={{
                          fontSize: "2em",
                          position: "absolute",
                          marginLeft: "10px",
                          float: "right",
                        }}
                      />
                    </NavText>
                  )}
                </MenuItem>
              </span>
            </Menu>
            <NavLink to="/dashboard/results/:pollId">
              <Menu iconShape="circle">
                <MenuItem icon={<GoGraph />}>
                  {!toggleVisible ? "" : <NavText>Stats</NavText>}
                </MenuItem>
              </Menu>
            </NavLink>
            <NavLink activeClassName="active" to="/dashboard/create-new-poll">
              <Menu iconShape="circle">
                <MenuItem icon={<BsPlus />}>
                  {!toggleVisible ? "" : <NavText>Add new poll</NavText>}
                </MenuItem>
              </Menu>
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
              <Menu iconShape="circle">
                {/* BsReverseLayoutSidebarReverse */}
                <MenuItem icon={<BsListUl />}>
                  {!toggleVisible ? "" : <NavText>All polls</NavText>}
                </MenuItem>
              </Menu>
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
              <Menu iconShape="circle">
                <MenuItem icon={<BsBookmarkDash />}>
                  {!toggleVisible ? "" : <NavText>All Songs</NavText>}
                </MenuItem>
              </Menu>
            </NavLink>
            <NavLink
              to="/dashboard/songsTwo"
              onClick={(e: any) => {
                ReactGA.event({
                  category: "Admin",
                  action: "Nav to Songs view",
                });
              }}
            >
              <Menu iconShape="circle">
                <MenuItem icon={<BsPerson />}>
                  {!toggleVisible ? "" : <NavText>Users</NavText>}
                </MenuItem>
              </Menu>
            </NavLink>
            <span
              onClick={(e: any) => {
                setSignOutVisible(!signOutVisible);
              }}
            >
              <Menu iconShape="circle">
                <MenuItem icon={<BsXCircle />}>
                  {!toggleVisible ? "" : <NavText>Logout</NavText>}
                  {/* <SubMenu title="Are you sure?"> */}
                  {/* </SubMenu> */}
                </MenuItem>
              </Menu>
              {signOutVisible ? (
                ""
              ) : (
                <Menu>
                  <NavLink
                    to="/dashboard/"
                    onClick={(e: any) => {
                      ReactGA.event({
                        category: "Admin",
                        action: "Logged out",
                      });
                      sessionStorage.removeItem("auth");
                      dispatch({ type: "setAuth", payload: undefined });
                    }}
                  >
                    <MenuItem icon={<TiTick />}>yes</MenuItem>
                  </NavLink>
                  <span
                    onClick={() => {
                      setSignOutVisible(false);
                    }}
                  >
                    <MenuItem icon={<RiArrowGoBackFill />}>no</MenuItem>
                  </span>
                </Menu>
              )}
            </span>

            {/* </NavLink> */}
          </NavMenu>
        </SidebarContent>
        <SidebarFooter>
          <UserStatus>
            {!toggleVisible ? (
              ""
            ) : (
              <NavText>
                Status: <b>{globalState.auth ? " currently" : " not"}</b> logged
                in.
              </NavText>
            )}
          </UserStatus>
        </SidebarFooter>
      </ProSidebar>
    </MenuComponent>
  );
};
