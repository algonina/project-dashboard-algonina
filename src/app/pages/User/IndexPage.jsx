import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import FormAdd from './FormAdd';
import UsersList from './UsersList';
import { actGetDataUser } from '../../modules/User/User_act';
import { actGetDataTypeuser } from '../../modules/Typeuser';
import FormEdit from './FormEdit';
import Can from '../../components/Helper/Can';

const IndexPage = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial ModulTypeuser Reducer
   */
  const modulUser = useSelector((state) => state.modulUser);
  const { status } = modulUser;

  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */
      dispatch(actGetDataUser());
    }
  }, [status, dispatch]);

  const { dataTypeuser, statusTypeuser } = useSelector(({ modulTypeuser }) => ({
    dataTypeuser: modulTypeuser.data,
    statusTypeuser: modulTypeuser.status,
  }));

  useEffect(() => {
    if (statusTypeuser === 'default') {
      /**
       * Fetching data
       */

      return dispatch(actGetDataTypeuser());
    }
  }, [statusTypeuser, dispatch]);

  return (
    <div className='page-content'>
      {/**
       * Init Form Add Component
       */}
      <FormAdd />
      <FormEdit />
      {/*  Component Form Add */}

      {/**
       * Init Form Edit Component
       */}
      {/* // Component Form Edit */}
      <Container fluid>
        <BreadCrumb title='Manage User' pageTitle='Dashboard' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Manage User</h5>
                  <div className='flex-shrink-0'>
                    <Can
                      modul={'modul-user|create'}
                      yes={
                        <Button
                          color='success'
                          onClick={() =>
                            dispatch(
                              __openModal({
                                modal: 'MODAL_ADD_USER',
                                open: true,
                              })
                            )
                          }
                        >
                          <i className='ri-add-line align-bottom me-1' /> Create User
                        </Button>
                      }
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/**
                 * Init List Component
                 */}
                <Can
                  modul={'modul-user|read'}
                  yes={<UsersList />}
                  no={<span>You don't have permission</span>}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IndexPage;
