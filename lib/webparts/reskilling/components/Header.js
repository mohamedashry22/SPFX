import * as React from 'react';
import { Link } from 'react-router-dom';
var Header = function (_a) {
    //   const { url } = useRouteMatch();
    var roles = _a.roles;
    return (React.createElement("nav", null,
        React.createElement("ul", { style: { display: 'flex', listStyle: 'none', padding: 0 } },
            roles.includes('Program Coordinator') && (React.createElement("li", { style: { marginRight: '10px' } },
                React.createElement(Link, { to: "/program-coordinator" }, "Program Coordinator"))),
            roles.includes('Mentor') && (React.createElement("li", { style: { marginRight: '10px' } },
                React.createElement(Link, { to: "/mentor" }, "Mentor"))),
            roles.includes('Interviewer') && (React.createElement("li", { style: { marginRight: '10px' } },
                React.createElement(Link, { to: "/interviewer" }, "Interviewer"))))));
};
export default Header;
//# sourceMappingURL=Header.js.map