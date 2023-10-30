import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

const DataUnidentify = ({ pageName, link }) => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className='justify-content-center'>
          <div className='text-center'>
            <div className='mt-3'>
              <h3 className='text-uppercase'>Sorry, {pageName} not Found 😭</h3>
              <p className='text-muted mb-4'>The {pageName} you are looking for not available!</p>
              <Link to={link} className='btn btn-success'>
                <i className='mdi mdi-home me-1'></i>Back to {pageName} page
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default DataUnidentify;
