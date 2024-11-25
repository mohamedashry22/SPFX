import * as React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import ProgramForm from './ProgramForm';
import ProgramList from './ProgramList';
import ProgramDetails from './ProgramDetails';
function ProgramCoordinatorDashboard(_a) {
    var context = _a.context;
    var _b = useRouteMatch(), path = _b.path, url = _b.url;
    return (React.createElement("div", null,
        React.createElement("h1", null, "Program Coordinator Dashboard"),
        React.createElement("nav", null,
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement(Link, { to: "".concat(url, "/") }, "Program List")),
                React.createElement("li", null,
                    React.createElement(Link, { to: "".concat(url, "/new-program") }, "Create New Program")))),
        React.createElement(Switch, null,
            React.createElement(Route, { exact: true, path: path },
                React.createElement(ProgramList, { context: context })),
            React.createElement(Route, { path: "".concat(path, "/new-program") },
                React.createElement(ProgramForm, { context: context })),
            React.createElement(Route, { path: "".concat(path, "/program/:programId") },
                React.createElement(ProgramDetails, { context: context })))));
}
export default ProgramCoordinatorDashboard;
//# sourceMappingURL=ProgramCoordinatorDashboard.js.map