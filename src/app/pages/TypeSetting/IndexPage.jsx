import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import TypeSettingList from './TypeSettingList';
import FormAdd from './FormAdd';
import { actGetDataTypesetting } from '../../modules/Setting';
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
  const modulTypeSetting = useSelector((state) => state.modulTypeSetting);
  const { status } = modulTypeSetting;
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */

      return dispatch(actGetDataTypesetting());
    }
  }, [status, dispatch]);

  return (
    <div className='page-content'>
      {/**
       * Init Form Add Component
       */}
      {/*  Component Form Add */}
      <FormAdd />
      {/**
       * Init Form Edit Component
       */}
      <FormEdit />
      {/* // Component Form Edit */}
      <Container fluid>
        <BreadCrumb title='Manage Type Setting' pageTitle='Dashboard' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Type Setting</h5>
                  <div className='flex-shrink-0'>
                    <Can
                      yes={
                        <Button
                          color='success'
                          onClick={() =>
                            dispatch(
                              __openModal({
                                modal: 'MODAL_ADD_TYPESETTING',
                                open: true,
                              })
                            )
                          }
                        >
                          <i className='ri-add-line align-bottom me-1' /> Create
                        </Button>
                      }
                      modul={'modul-type-setting|create'}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/**
                 * Init List Component
                 */}
                <Can
                  modul={'modul-type-setting|read'}
                  yes={<TypeSettingList />}
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
