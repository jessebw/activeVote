import React, { useState } from "react";
import { useGlobalState } from "../../state/stateContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserStatus } from "../../components/StyledComponents";
import ReactGA from "react-ga";

import {
  BsGraphUp,
  BsPlus,
  BsListUl,
  BsReverseLayoutSidebarReverse,
  BsPeople,
  BsHeart,
  BsListOl,
  BsBookmarkDash,
  BsArrowLeftRight,
  BsArrowRight,
  BsArrowLeft,
  BsPerson,
  BsXCircle,
  BsListCheck,
  BsXSquare,
} from "react-icons/bs";

import { TiTick } from "react-icons/ti";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaTachometerAlt } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { GoGraph } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { MdShowChart } from "react-icons/md";
import { IUser } from "../../interfaces";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

const MenuComponent = styled.div`
  // display: inline-block;
  // flex: 0 0 auto;
  // width: 20%;
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
  // display: block;
  // margin: auto;
  // width: 85%;
  // margin-top: 100px;
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
  // margin-left: 10px;
`;

export const SideMenu = (props: { currentUser: any }) => {
  const [globalState, dispatch] = useGlobalState();
  const [toggleVisible, setToggleVisible] = useState<boolean>(true);
  const [signOutVisible, setSignOutVisible] = useState<boolean>(true);

  return (
    <MenuComponent>
      {/* <h1>test</h1>
      <NavMenu>
        <NavLink to="/dashboard/results/:pollId">
          <span
            style={{
              borderRadius: "50%",
              backgroundColor: "white",
              width: "50px",
              height: "50px",
            }}
          >
            <BsGraphUp
              style={{ width: "35px", height: "35px", color: "#000" }}
            />
          </span>
          <BsGraphUp style={{ width: "35px", height: "35px", color: "#000" }} />
          <NavText>STATS</NavText>
        </NavLink>

        <NavLink activeClassName="active" to="/dashboard/create-new-poll">
          <BsPlus
            style={{
              width: "35px",
              height: "35px",
              color: "#000",
              // margin: "0 auto",
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
          <NavText>LOGOUT</NavText>
        </NavLink>
      </NavMenu> */}
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
                        // float: "right",
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
                  {!toggleVisible ? "" : <NavText>Poll items</NavText>}
                </MenuItem>
              </Menu>
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
              <Menu iconShape="circle">
                <MenuItem icon={<BsPerson />}>
                  {!toggleVisible ? "" : <NavText>Users</NavText>}
                </MenuItem>
              </Menu>
            </NavLink>
            {/* <NavLink
            to="/dashboard/"
            onClick={(e: any) => {
              ReactGA.event({
                category: "Admin",
                action: "Logged out",
              });
              sessionStorage.removeItem("auth");
              dispatch({ type: "setAuth", payload: undefined });
            }}
            > */}
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
                Status:{" "}
                <b>
                  {console.log(props.currentUser.email)}
                  {props.currentUser.email}
                  {globalState.auth ? " currently" : " not"}
                </b>{" "}
                logged in.
              </NavText>
            )}
          </UserStatus>
        </SidebarFooter>
      </ProSidebar>
    </MenuComponent>
  );
};
