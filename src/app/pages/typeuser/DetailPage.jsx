import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import { useParams } from 'react-router-dom';
import { actDetailDataTypeuser } from '../../modules/Typeuser';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { actGetDataPermissionShema, actGetPermissionDataMenu } from '../../modules/Permission';
import { actGetDataSchema } from '../../modules/Schema';
import ListModulPermission from './Permission-modul/ListModulPermission';
import ListMenu from './PermissionMenu/ListMenu';
import Can from '../../components/Helper/Can';

const DetailPage = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  const { id } = useParams();

  const [data, setData] = useState({});

  const [topBorderjustifyTab, settopBorderjustifyTab] = useState('1');
  const topBorderJustifytoggle = (tab) => {
    if (topBorderjustifyTab !== tab) {
      settopBorderjustifyTab(tab);
    }
  };

  /**
   * Initial ModulTypeuser Reducer
   */
  const { idTypeuser, detailTypeuser, statusTypeuser } = useSelector(({ modulTypeuser }) => ({
    idTypeuser: modulTypeuser.id,
    detailTypeuser: modulTypeuser.detail,
    statusTypeuser: modulTypeuser.status,
  }));

  const { idPermissionMenu } = useSelector(({ modulPermissionMenu }) => ({
    idPermissionMenu: modulPermissionMenu.id,
    dataPermissionMenu: modulPermissionMenu.data,
    statusPermissionMenu: modulPermissionMenu.status,
  }));

  useEffect(() => {
    if (idPermissionMenu !== id) {
      dispatch(actGetPermissionDataMenu(id, 'by=typeuser'));
    }
  }, [idPermissionMenu, id]);

  useEffect(() => {
    if (idTypeuser !== id) {
      dispatch(actDetailDataTypeuser({ id: id }));
    }
  }, [idTypeuser]);

  const modulSchema = useSelector((state) => state.modulSchema);
  const { status } = modulSchema;
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */

      return dispatch(actGetDataSchema());
    }
  }, [status, dispatch]);

  const { idPermisionSchema } = useSelector(({ modulPermissionSchema }) => ({
    idPermisionSchema: modulPermissionSchema.id,
  }));

  useEffect(() => {
    if (idPermisionSchema !== id) {
      return dispatch(actGetDataPermissionShema(id, 'by=typeuser'));
    }
  }, [idPermisionSchema, id]);

  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (statusTypeuser === 'detail') {
      if (Object.keys(detailTypeuser).length > 0) {
        setData({ ...detailTypeuser });
      } else {
        setData({});
      }
    }
  }, [statusTypeuser, dispatch, detailTypeuser]);

  return (
    <div className='page-content'>
      {/**
       * Init Form Add Component
       */}
      {/*  Component Form Add */}

      {/**
       * Init Form Edit Component
       */}
      {/* // Component Form Edit */}
      <Container fluid>
        <BreadCrumb title='Setting Type User' pageTitle='Dashboard' />
        {statusTypeuser !== 'loading' ? (
          <Can
            modul={'modul-user-type|read'}
            yes={
              <Row>
                {Object.keys(detailTypeuser).length > 0 ? (
                  <Col xs={12}>
                    <Card>
                      <CardHeader>
                        <div className='d-flex align-items-center justify-content-between'>
                          <div>
                            <span className='text-muted fs-10'>Name</span>
                            <h5 className='card-title mb-0 fw-bold flex-grow-1 text-uppercase'>
                              {data?.typeuser_name}
                            </h5>
                          </div>
                          <div>
                            {data?.is_active === '1' ? (
                              <Badge color='success'>Active</Badge>
                            ) : (
                              <Badge color='danger'>Not Active</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Nav
                          tabs
                          className='nav nav-tabs nav-border-top nav-border-top-primary mb-3'
                        >
                          <NavItem>
                            <NavLink
                              style={{ cursor: 'pointer' }}
                              className={classnames({ active: topBorderjustifyTab === '1' })}
                              onClick={() => {
                                topBorderJustifytoggle('1');
                              }}
                            >
                              Permission Menu
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: 'pointer' }}
                              className={classnames({ active: topBorderjustifyTab === '2' })}
                              onClick={() => {
                                topBorderJustifytoggle('2');
                              }}
                            >
                              Permission Modul
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent activeTab={topBorderjustifyTab} className='text-muted'>
                          <TabPane tabId='1' id='nav-border-top-home'>
                            <div className='d-flex'>
                              <div className='flex-grow-1 ms-2'>
                                <Can
                                  yes={<ListMenu />}
                                  modul={'permission-menu|read'}
                                  no={<span>You don't have permission</span>}
                                />
                              </div>
                            </div>
                          </TabPane>

                          <TabPane tabId='2' id='nav-border-top-profile'>
                            <div className='d-flex'>
                              <div className='flex-grow-1 ms-2'>
                                <Can
                                  yes={<ListModulPermission />}
                                  modul={'permission-modul|read'}
                                  no={<span>You don't have permission</span>}
                                />
                              </div>
                            </div>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>
                ) : (
                  <Alert color='danger'>Type User Not Found</Alert>
                )}
              </Row>
            }
          />
        ) : (
          '...'
        )}
      </Container>
    </div>
  );
};

export default DetailPage;
