import React from "react";
import { Route } from "react-router-dom";
import { Polls } from "./Polls";
import { Stats } from "./Stats";
import { CreateNewPoll } from "./CreateNewPoll";
import { Users } from "./Users";
import { SideMenu } from "./SideMenu";
import styled from "styled-components";

const DashWrapper = styled.div`
  display: flex;
  height: 100vh;
  > div:first-child {
    flex: 0 0 auto;
  }
  .view-panel {
    flex: 1 1 auto;
    background-color: green;
  }
`;

export const Dashboard = () => {
  return (
    <DashWrapper>
      <SideMenu />
      <div className="view-panel">
        <Route path={`/dashboard/polls`} component={Polls} />
        <Route path={`/dashboard/stats`} component={Stats} />
        <Route path={`/dashboard/users`} component={Users} />
        <Route path={`/dashboard/create-new-poll`} component={CreateNewPoll} />
      </div>
    </DashWrapper>
  );
};
