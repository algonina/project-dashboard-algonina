import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';

// import Widgets from './Widgets';
// import Marketplace from './Marketplace';
// import Popularity from './Popularity';
// import FeaturedNFT from './FeaturedNFT';
// import RecentNFTs from './RecentNFTs';

import { useSelector } from 'react-redux';
// import CountUp from 'react-countup/build/CountUp';
import avatar1 from '../../../vendor/assets/images/users/avatar-1.jpg';
import Can from '../../components/Helper/Can';

const DashboardNFT = () => {
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

  const [data, setData] = useState({
    fullname: '',
    username: '',
    type: '',
    photo: null,
  });

  useEffect(() => {
    if (Object.keys(dataProfile).length) {
      setData(dataProfile);
    }
  }, [dataProfile]);

  document.title = 'Dashboard - Algonina';
  const cards = [
    'laravel',
    'flutter',
    'python',
    'react',
    'redis',
    'spring',
    'swagger',
    'npm1',
    'go',
    'graphql',
    'typescript',
    'ubuntu',
    'next-dot-js',
    'tailwindcss',
    'matrix',
    'nginx',
    'node-dot-js',
    'java',
    'flask',
    'yarn',
    'dart',
  ];
  return (
    <React.Fragment>
      <div className='page-content bg-white mb-0'>
        <Container fluid className='bg-white border-bottom'>
          <BreadCrumb title='Dashboard' pageTitle='Dashboard' />
          <Container className='py-4 my-4'>
            <div className='d-flex align-items-center py-3'>
              <div className='avatar-lg flex-shrink-0 me-3'>
                <img
                  src={data.photo || avatar1}
                  alt=''
                  className='img-fluid shadow-lg rounded-circle'
                />
              </div>
              <div className='flex-grow-1'>
                <div>
                  <h1 className='fw-bold mb-1'>Hi, {data.fullname}</h1>
                  <p className='fs-12 text-muted mb-0 fw-medium'>{data.username}</p>
                </div>
              </div>
            </div>
          </Container>

          {/* <Row className='dash-nft'>
            <Col xxl={9}>
              <Widgets />
              <Marketplace />
            </Col>
            <Popularity />
          </Row>
          <FeaturedNFT />
          <RecentNFTs /> */}
        </Container>

        <Container fluid className=''>
          <Container className='py-4'>
            <div className='d-flex align-items-center mb-4 py-2 '>
              <h4 className='mb-0 flex-grow-1 font-weight-bold'>My Started</h4>
              <div className='flex-shrink-0'>
                <Button
                  type='button'
                  color='light'
                  className='btn btn-icon px-2 fs-14 mr-2 shadow-none border'
                  size='sm'
                >
                  <i className='bx bxs-book-content text-muted align-middle fs-16'></i>
                </Button>
                <Button
                  type='button'
                  color='light'
                  className='btn btn-icon px-2 fs-14 mr-2 shadow-none border'
                  size='sm'
                >
                  <i className='bx bx-group text-muted align-middle fs-16'></i>
                </Button>
                <Button
                  type='button'
                  color='success'
                  className='btn btn-label px-2 fs-14 shadow-none border-success'
                  size='sm'
                >
                  <i className=' bx bx-plus align-middle fs-16 me-1'></i> New Content
                </Button>
              </div>
            </div>
            <Row>
              {(cards || []).map((item, key) => (
                <Col md='4' key={key} className=''>
                  <Card className='border shadow-none'>
                    <CardBody>
                      <div className='float-end'>
                        <UncontrolledDropdown direction='start'>
                          <DropdownToggle className='text-reset' tag='a' role='button'>
                            <span className='text-muted fs-18'>
                              <i className='mdi mdi-dots-horizontal'></i>
                            </span>
                          </DropdownToggle>
                          <DropdownMenu className='dropdown-menu dropdown-menu-end'>
                            <DropdownItem href='#'> Details </DropdownItem>
                            <DropdownItem href='#'> Cancel </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className='d-flex align-items-center'>
                        <div
                          className='d-flex align-items-center align-items-center justify-content-center text-center rounded-circle bg-light'
                          style={{ width: '50px', height: '50px' }}
                        >
                          <span className={`icon-${item} fs-24`} />
                        </div>

                        {/* <h6 className='ms-2 mb-0 fs-14'>{item.label}</h6> */}
                      </div>
                      <Row className='align-items-end g-0'>
                        <Col xs={12}>
                          <h5 className='mb-1 mt-4 mb-1'>{item}</h5>
                          <p className={'fs-11 mb-0 text-muted'}>
                            <em>Last Update 12 Jan 2023</em>
                          </p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardNFT;
