import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import SchemaList from './SchemaList';
import { actGetDataSchema } from '../../modules/Schema';
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

  return (
    <div className='page-content'>
      {/**
       * Init Form Add Component
       */}
      {/*  Component Form Add */}
      <FormAdd />
      <FormEdit />
      {/**
       * Init Form Edit Component
       */}
      {/* // Component Form Edit */}
      <Container fluid>
        <BreadCrumb title='Manage Modul' pageTitle='Dashboard' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Manage Modul</h5>
                  <div className='flex-shrink-0'>
                    <Can
                      yes={
                        <Button
                          color='success'
                          onClick={() =>
                            dispatch(
                              __openModal({
                                modal: 'MODAL_ADD_SCHEMA',
                                open: true,
                              })
                            )
                          }
                        >
                          <i className='ri-add-line align-bottom me-1' /> Create
                        </Button>
                      }
                      modul={'modul|create'}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/**
                 * Init List Component
                 */}
                <Can
                  yes={<SchemaList />}
                  modul={'modul|read'}
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
