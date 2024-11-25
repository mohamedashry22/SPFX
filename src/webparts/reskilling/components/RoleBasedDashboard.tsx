import * as React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProgramCoordinatorDashboard from './ProgramCoordinator/ProgramCoordinatorDashboard';
import MentorDashboard from './Mentor/MentorDashboard';
import InterviewerDashboard from './Interviewer/InterviewerDashboard';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IRoleBasedDashboardProps {
  roles: string[];
  context: WebPartContext;
}

const RoleBasedDashboard: React.FC<IRoleBasedDashboardProps> = ({ roles, context }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {roles.includes('Program Coordinator') && (
        <Route path="/dashboard/program-coordinator">
          <ProgramCoordinatorDashboard context={context} />
        </Route>
      )}

{roles.includes('Mentor') && (
        <Route path={`${path}/mentor`}>
          <MentorDashboard context={context} />
        </Route>
      )}

      {roles.includes('Interviewer') && (
        <Route path={`${path}/interviewer`}>
          <InterviewerDashboard context={context} />
        </Route>
      )}

      <Route path="*">
        <Redirect to="/" />
      </Route>

    </Switch>
  );
};

export default RoleBasedDashboard;