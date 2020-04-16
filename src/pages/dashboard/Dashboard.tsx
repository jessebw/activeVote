import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Polls } from "./Polls";
import { Songs } from "./Songs";
import { CreateNewPoll } from "./CreateNewPoll";
import { Users } from "./Users";
import { EditPoll } from "./EditPoll";
import { SideMenu } from "./SideMenu";
import styled from "styled-components";
import { PollResults } from "./PollResults";
import ReactGA from "react-ga";

const DashWrapper = styled.div`
  display: flex;
  height: 100vh;
  > div:first-child {
    flex: 0 0 auto;
  }
  .view-panel {
    flex: 1 1 auto;
    border-left: 5px solid #dbdbdb;
    overflow-y: auto;
  }
`;

export const Dashboard = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <DashWrapper>
      <SideMenu />
      <div className="view-panel">
        <Route path={`/dashboard/polls`} component={Polls} />
        <Route path={`/dashboard/users`} component={Users} />
        <Route path={`/dashboard/create-new-poll`} component={CreateNewPoll} />
        <Route path={`/dashboard/songs`} component={Songs} />
        <Route path={`/dashboard/editpoll/:id`} component={EditPoll} />
        <Route path={`/dashboard/results/:pollId`} component={PollResults} />
      </div>
    </DashWrapper>
  );
};
