import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
export default () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <PageHeader>
        {' '}
        <span className="text-danger">404</span> Page Not Found
      </PageHeader>
      <p className="leade">Sorry, that page doesn't exist</p>
    </div>
  );
};
