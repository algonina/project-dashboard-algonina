import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import ListTypeuser from './TypeuserList';
import FormAdd from './FormAdd';
import { actGetDataTypeuser } from '../../modules/Typeuser/Typeuser_act';
import FormEdit from './FormEdit';
import { successnotify } from '../../components/ToasNotif/Toast';
import { toast } from 'react-toastify';
import Can from '../../components/Helper/Can';

const IndexPage = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial ModulTypeuser Reducer
   */
  const modulTypeuser = useSelector((state) => state.modulTypeuser);
  const { status, data } = modulTypeuser;
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default' || (status === 'detail' && data.length === 0)) {
      /**
       * Fetching data
       */

      return dispatch(actGetDataTypeuser());
    }
  }, [status, dispatch, data]);

  return (
    <div className='page-content'>
      {/**
       * Init Form Add Component
       */}
      <FormAdd />
      {/*  Component Form Add */}
      <FormEdit />

      {/**
       * Init Form Edit Component
       */}
      {/* // Component Form Edit */}
      <Container fluid>
        <BreadCrumb title='Type User' pageTitle='Dashboard' />

        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Type's User</h5>
                  <div className='flex-shrink-0'>
                    <Can
                      yes={
                        <Button
                          color='success'
                          onClick={() =>
                            dispatch(
                              __openModal({
                                modal: 'FORM_ADD_TYPEUSER',
                                open: true,
                              })
                            )
                          }
                        >
                          <i className='ri-add-line align-bottom me-1' /> Type User
                        </Button>
                      }
                      modul={'modul-user-type|create'}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/**
                 * Init List Component
                 */}
                <Can
                  modul={'modul-user-type|read'}
                  yes={<ListTypeuser />}
                  no={<span>You dont have access</span>}
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
