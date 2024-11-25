import * as React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProgramCoordinatorDashboard from './ProgramCoordinator/ProgramCoordinatorDashboard';
import MentorDashboard from './Mentor/MentorDashboard';
import InterviewerDashboard from './Interviewer/InterviewerDashboard';
import UnauthorizedPage from './UnauthorizedPage';
import LoadingSpinner from './LoadingSpinner';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { Config } from '../config/config';
import { getSP } from '../../../index';
import { IRole } from './models/IRole';
import Header from './Header';

interface IReskillingProgramProps {
  context: WebPartContext;
}

const ReskillingProgram: React.FC<IReskillingProgramProps> = ({ context }) => {
  const [roles, setRoles] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // Fetch user roles from SharePoint list
  React.useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const sp: SPFI = getSP(context);
        const currentUser = await sp.web.currentUser();
        const userEmail = currentUser.Email;

        const USER_ROLES_LIST = Config.LIST_NAMES.USER_ROLES;

        const userRoles = await sp.web.lists
          .getByTitle(USER_ROLES_LIST)
          .items.filter(`UserEmail eq '${userEmail}'`)
          .select('Title')();

        const roleNames = userRoles.map((role: IRole) => role.Title);
        setRoles(roleNames);
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [context]);

  // Show loading spinner until user roles are fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show Unauthorized page if no roles are found
  if (roles.length === 0) {
    return <UnauthorizedPage />;
  }

  // Determine the default dashboard based on the user's roles
  let defaultRolePath = '';
  if (roles.includes('Program Coordinator')) {
    defaultRolePath = '/program-coordinator';
  } else if (roles.includes('Mentor')) {
    defaultRolePath = '/mentor';
  } else if (roles.includes('Interviewer')) {
    defaultRolePath = '/interviewer';
  } else {
    return <UnauthorizedPage />;
  }

  return (
    <Router>
      {/* Header will show based on roles */}
      <Header roles={roles} />
      <Switch>
        {/* Redirect to the user's default dashboard */}
        <Route exact path="/">
          <Redirect to={defaultRolePath} />
        </Route>

        {/* Program Coordinator Dashboard */}
        <Route path="/program-coordinator">
          {roles.includes('Program Coordinator') ? (
            <ProgramCoordinatorDashboard context={context} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        {/* Mentor Dashboard */}
        <Route path="/mentor">
          {roles.includes('Mentor') ? (
            <MentorDashboard context={context} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        {/* Interviewer Dashboard */}
        <Route path="/interviewer">
          {roles.includes('Interviewer') ? (
            <InterviewerDashboard context={context} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        {/* Catch-all Route - redirects to home */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReskillingProgram;
