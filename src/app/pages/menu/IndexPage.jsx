import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import { actGetDataMenu } from '../../modules/Schema';
import MenuList from './MenuList';
import FormAdd from './FormAdd';
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
  const modulMenu = useSelector((state) => state.modulMenu);
  const { status } = modulMenu;
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */

      dispatch(actGetDataMenu());
    }
  }, [status, dispatch]);

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
      <FormAdd />
      <FormEdit />
      <Container fluid>
        <BreadCrumb title='Manage Menu' pageTitle='Dashboard' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Manage Menu</h5>
                  <div className='flex-shrink-0'>
                    <Can
                      modul={'modul|create'}
                      yes={
                        <Button
                          color='success'
                          onClick={() =>
                            dispatch(
                              __openModal({
                                modal: 'MODAL_ADD_SCHEMA_MENU',
                                open: true,
                              })
                            )
                          }
                        >
                          <i className='ri-add-line align-bottom me-1' /> Create
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
                  yes={<MenuList />}
                  modul={'menu|read'}
                  no={<span>You don't have pemrission</span>}
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
