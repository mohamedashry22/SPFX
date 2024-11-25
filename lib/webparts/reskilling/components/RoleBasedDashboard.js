import * as React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProgramCoordinatorDashboard from './ProgramCoordinator/ProgramCoordinatorDashboard';
import MentorDashboard from './Mentor/MentorDashboard';
import InterviewerDashboard from './Interviewer/InterviewerDashboard';
var RoleBasedDashboard = function (_a) {
    var roles = _a.roles, context = _a.context;
    var path = useRouteMatch().path;
    return (React.createElement(Switch, null,
        roles.includes('Program Coordinator') && (React.createElement(Route, { path: "/dashboard/program-coordinator" },
            React.createElement(ProgramCoordinatorDashboard, { context: context }))),
        roles.includes('Mentor') && (React.createElement(Route, { path: "".concat(path, "/mentor") },
            React.createElement(MentorDashboard, { context: context }))),
        roles.includes('Interviewer') && (React.createElement(Route, { path: "".concat(path, "/interviewer") },
            React.createElement(InterviewerDashboard, { context: context }))),
        React.createElement(Route, { path: "*" },
            React.createElement(Redirect, { to: "/" }))));
};
export default RoleBasedDashboard;
//# sourceMappingURL=RoleBasedDashboard.js.map