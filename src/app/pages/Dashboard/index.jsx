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
  ListGroupItem,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';

// import Widgets from './Widgets';
// import Marketplace from './Marketplace';
// import Popularity from './Popularity';
// import FeaturedNFT from './FeaturedNFT';
// import RecentNFTs from './RecentNFTs';

import { useDispatch, useSelector } from 'react-redux';
// import CountUp from 'react-countup/build/CountUp';
import avatar1 from '../../../vendor/assets/images/users/avatar-1.jpg';
import Can from '../../components/Helper/Can';
import { __openModal } from '../../modules/Modal';
import FormAddRoom from '../Room/FormAddRoom';
import {
  actDeleteDataRoom,
  actGetDataCategory,
  actGetDataMark,
  actGetDataRoom,
} from '../../modules/Room';
import FromEdit from '../Room/FormEdit';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { widgetsActivities, widgetsTasks } from '../../../vendor/common/data/index';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const DashboardNFT = () => {
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

  const [bookmarks, setBookmarks] = useState([]);

  const { dataMark, statusMark } = useSelector(({ modulMarkContent }) => ({
    dataMark: modulMarkContent.data,
    statusMark: modulMarkContent.status,
  }));

  const [rooms, setRooms] = useState([]);

  const dispatch = useDispatch();

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

  const { statusCategory } = useSelector(({ modulCategoryRoom }) => ({
    statusCategory: modulCategoryRoom.status,
  }));

  const { statusRoom, dataRoom, idRoom } = useSelector(({ modulRoom }) => ({
    statusRoom: modulRoom.status,
    dataRoom: modulRoom.data,
    idRoom: modulRoom.id,
  }));

  useEffect(() => {
    if (statusMark === 'default') {
      dispatch(actGetDataMark());
    }
  });
  useEffect(() => {
    if (statusRoom === 'default' || idRoom !== '') {
      dispatch(actGetDataRoom());
    }
  }, [statusRoom]);

  useEffect(() => {
    if (statusCategory === 'default') {
      dispatch(actGetDataCategory());
    }
  }, [statusCategory]);

  useEffect(() => {
    if (dataRoom.length) {
      setRooms(dataRoom);
    }
  }, [statusRoom]);

  useEffect(() => {
    if (dataMark.length) {
      setBookmarks(dataMark);
    }
  }, [dataMark]);

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

  const onEdit = (rows) => {
    dispatch(__openModal({ modal: 'MODAL_EDIT_ROOM', data: rows, open: true }));
  };

  const handleDeleteContent = (params) => {
    confirmDialog({
      message: 'Do you want to delete the room?',
      header: 'Delete Room',
      icon: 'pi pi-info-circle',
      acceptClassName: 'btn-sm btn-default',
      rejectClassName: 'btn-sm me-2 btn-danger',
      draggable: false,
      accept: () => dispatch(actDeleteDataRoom(params)),

      reject: () => {},
    });
  };

  return (
    <React.Fragment>
      <ConfirmDialog />

      <div className='page-content bg-white mb-0 border pb-5'>
        <Container fluid className='bg-white border-bottom bg-white '>
          <BreadCrumb title='Dashboard' pageTitle='Dashboard' />
          <Container className='py-4 my-4 bg-white'>
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

        <FormAddRoom />
        <FromEdit />

        <Container className='pb-4 bg-white'>
          <Container className='py-4'>
            <div className='d-flex align-items-center mb-4 py-2 '>
              <h4 className='mb-0 flex-grow-1 font-weight-bold'>My Dashboard</h4>
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
                  disabled={statusCategory === 'loading'}
                  type='button'
                  color='success'
                  className='btn btn-label px-2 fs-14 shadow-none border-success'
                  size='sm'
                  onClick={() => dispatch(__openModal({ modal: 'MODAL_ADD_ROOM', open: true }))}
                >
                  <i className=' bx bx-plus align-middle fs-16 me-1'></i> New Room
                </Button>
              </div>
            </div>
            {bookmarks.length > 0 ? (
              <React.Fragment>
                <h6 className='fw-bold d-flex align-content-center'>
                  <i className='ri-star-fill text-warning me-2'></i> Bookmark
                </h6>
                <Row className=''>
                  {bookmarks.map((item, key) => (
                    <Col md='4' className='mb-2' key={key}>
                      <ListGroupItem className='px-3 rounded' key={key}>
                        <Row className='align-items-center g-3'>
                          <Col className='col'>
                            <h5 className='text-muted mt-0 mb-1 fs-13'>{item.room_title}</h5>
                            <Link
                              to={`/room/${item.room_slug}/${item.room_code}/${item.content_code}`}
                              className='text-reset fs-14 mb-0 fw-semibold'
                            >
                              {item.content_title}
                            </Link>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </Col>
                  ))}
                </Row>

                <div className='dropdown-divider pb-3'></div>
              </React.Fragment>
            ) : (
              ''
            )}

            <h6 className='fw-bold d-flex align-content-center'>
              <i className='mdi mdi-google-classroom mr-2'></i> My Rooms
            </h6>
            <Row>
              {rooms.map((item, key) => (
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
                            <DropdownItem href='#' onClick={() => onEdit(item)}>
                              Edit
                            </DropdownItem>
                            <div className='dropdown-divider'></div>

                            <DropdownItem
                              className='text-danger'
                              onClick={() => handleDeleteContent({ id: item.code })}
                            >
                              <i className='mdi  mdi-alert-circle-outline fs-16 align-middle me-1'></i>
                              <span className='align-middle'>Delete</span>{' '}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className='d-flex align-items-center'>
                        <div
                          className='d-flex align-items-center align-items-center justify-content-center text-center rounded-circle bg-light'
                          style={{ width: '50px', height: '50px' }}
                        >
                          <span className={`${item.category_icon} fs-24`} />
                        </div>

                        {/* <h6 className='ms-2 mb-0 fs-14'>{item.label}</h6> */}
                      </div>
                      <Row className='align-items-end g-0'>
                        <Col xs={12}>
                          <h5 className='mb-1 mt-4 mb-1'>
                            <Link className='text-dark' to={`/room/${item.room_slug}/${item.code}`}>
                              {item.room_title}
                            </Link>
                          </h5>
                          <p className={'fs-11 mb-0 text-muted'}>
                            <em>Last Update {moment(item.updated_at).format('DD MMM YYYY H:m')}</em>
                          </p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))}

              {statusRoom === 'loading' && rooms.length === 0 ? (
                <Col md='4' className=''>
                  <Card className='border shadow-none'>
                    <CardBody>
                      <div className='float-end'></div>
                      <div className='d-flex align-items-center'>
                        <div
                          className='d-flex align-items-center avatar-skeleton align-items-center justify-content-center text-center rounded-circle bg-light'
                          style={{ width: '50px', height: '50px' }}
                        >
                          <span className={`fs-24`} />
                        </div>

                        {/* <h6 className='ms-2 mb-0 fs-14'>{item.label}</h6> */}
                      </div>
                      <Row className='align-items-end g-0'>
                        <Col xs={12}>
                          <h5 className='mb-1 mb-1 skeleton-loader'>
                            <Link className='text-dark' to={`#`}></Link>
                          </h5>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ) : (
                ''
              )}
            </Row>
          </Container>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardNFT;
