import * as React from 'react';

const UnauthorizedPage: React.FC = () => {
  return (
    <div>
      <h1>You are not authorized to access this application.</h1>
      <p>Please contact the administrator for access.</p>
    </div>
  );
};

export default UnauthorizedPage;