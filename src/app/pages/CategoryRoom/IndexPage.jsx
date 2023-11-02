import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import { actGetDataCategory } from '../../modules/Room';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import CategoriesList from './CategoriesList';

const IndexPage = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial ModulTypeuser Reducer
   */
  const modulCategoryRoom = useSelector((state) => state.modulCategoryRoom);
  const { status } = modulCategoryRoom;
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */
      dispatch(actGetDataCategory());
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
        <BreadCrumb title='Page Title' pageTitle='Dashboard' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Category</h5>
                  <div className='flex-shrink-0'>
                    <Button
                      color='success'
                      onClick={() =>
                        dispatch(
                          __openModal({
                            modal: 'MODAL_ADD_CATEGORY',
                            open: true,
                          })
                        )
                      }
                    >
                      <i className='ri-add-line align-bottom me-1' /> Create
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/**
                 * Init List Component
                 */}
                <CategoriesList />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IndexPage;
