import React from "react";
import { Route } from "react-router-dom";
import { Polls } from "./Polls";
import { Stats } from "./Stats";
import { Songs } from "./Songs";
import { Votes } from "./Votes";
import { CreateNewPoll } from "./CreateNewPoll";
import { Users } from "./Users";
import { EditPoll } from "./EditPoll";
import { SideMenu } from "./SideMenu";
import styled from "styled-components";
import { useStateValue } from "../../state/stateContext";

const DashWrapper = styled.div`
  display: flex;
  height: 100vh;
  /* clear: left; */
  > div:first-child {
    flex: 0 0 auto;
  }
  .view-panel {
    flex: 1 1 auto;
    border-left: 5px solid #dbdbdb;
    overflow-y: auto;
  }
`;

const UserStatus = styled.div`
  position: absolute;
  bottom: 0;
  /* right: 0; */
  margin: 10px;
  left: 0;
`;

export const Dashboard = () => {
  const [globalState, dispatch] = useStateValue();
  return (
    <DashWrapper>
      <UserStatus>
        Status: <b>{globalState.auth ? "currently" : "not"}</b> logged in.
      </UserStatus>
      <SideMenu />
      <div className="view-panel">
        <Route path={`/dashboard/polls`} component={Polls} />
        <Route path={`/dashboard/stats`} component={Stats} />
        <Route path={`/dashboard/users`} component={Users} />
        <Route path={`/dashboard/create-new-poll`} component={CreateNewPoll} />
        <Route path={`/dashboard/songs`} component={Songs} />
        <Route path={`/dashboard/votes`} component={Votes} />
        <Route path={`/dashboard/editpoll/:id`} component={EditPoll} />
      </div>
    </DashWrapper>
  );
};
