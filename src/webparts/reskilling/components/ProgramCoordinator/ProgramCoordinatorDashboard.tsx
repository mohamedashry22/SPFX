import * as React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import ProgramForm from './ProgramForm';
import ProgramList from './ProgramList';
import ProgramDetails from './ProgramDetails';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IProgramCoordinatorDashboardProps {
  context: WebPartContext;
}

function ProgramCoordinatorDashboard({ context }: Readonly<IProgramCoordinatorDashboardProps>) {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h1>Program Coordinator Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to={`${url}/`}>Program List</Link>
          </li>
          <li>
            <Link to={`${url}/new-program`}>Create New Program</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path={path}>
          <ProgramList context={context} />
        </Route>
        <Route path={`${path}/new-program`}>
          <ProgramForm context={context} />
        </Route>
        <Route path={`${path}/program/:programId`}>
          <ProgramDetails context={context} />
        </Route>
      </Switch>
    </div>
  );
}

export default ProgramCoordinatorDashboard;