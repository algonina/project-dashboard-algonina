import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from '../ParticlesAuth';

//import images
import logoLight from '../../../../assets/img/logo.png';

const BasicLogout = () => {
  document.title = 'Dashborad - Log out!';
  return (
    <React.Fragment>
      <div className='auth-page-content'>
        <div className='auth-page-wrapper'>
          <ParticlesAuth>
            <div className='auth-page-content'>
              <Container>
                <Row>
                  <Col lg={12}>
                    <div className='text-center mt-sm-5 mb-4 mt-0 text-white-50'>
                      <div>
                        <Link to='/dashboard' className='d-inline-block auth-logo'>
                          <img src={logoLight} alt='' height='50' />
                        </Link>
                      </div>
                      <p className='mt-3 fs-15 fw-medium text-black-50'>
                        {process.env.REACT_APP_TITLE}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className='justify-content-center'>
                  <Col md={8} lg={6} xl={5}>
                    <Card className='mt-4'>
                      <CardBody className='p-4 text-center'>
                        <lord-icon
                          src='https://cdn.lordicon.com/hzomhqxz.json'
                          trigger='loop'
                          colors='primary:#405189,secondary:#08a88a'
                          style={{ width: '180px', height: '180px' }}
                        ></lord-icon>

                        <div className='mt-4 pt-2'>
                          <h5>You are Logged Out</h5>
                          <p className='text-muted fw-bold'>Thank you!</p>
                          <div className='mt-4'>
                            <Link to='/' className='btn btn-success w-100'>
                              Sign In
                            </Link>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </ParticlesAuth>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BasicLogout;
