import * as React from 'react';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  roles: string[];
}

const Header: React.FC<IHeaderProps> = ({ roles }) => {
//   const { url } = useRouteMatch();

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        {roles.includes('Program Coordinator') && (
          <li style={{ marginRight: '10px' }}>
            <Link to={`/program-coordinator`}>Program Coordinator</Link>
          </li>
        )}
        {roles.includes('Mentor') && (
          <li style={{ marginRight: '10px' }}>
            <Link to={`/mentor`}>Mentor</Link>
          </li>
        )}
        {roles.includes('Interviewer') && (
          <li style={{ marginRight: '10px' }}>
            <Link to={`/interviewer`}>Interviewer</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;