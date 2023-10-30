import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import SettingList from './SettingList';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import { actGetDataSetting, actGetDataTypesetting } from '../../modules/Setting';
import Can from '../../components/Helper/Can';
const IndexPage = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial ModulTypeuser Reducer
   */
  const modulSetting = useSelector((state) => state.modulSetting);
  const { status } = modulSetting;

  const { statusTypeSetting } = useSelector(({ modulTypeSetting }) => ({
    statusTypeSetting: modulTypeSetting.status,
  }));
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */

      dispatch(actGetDataSetting());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (statusTypeSetting === 'default') {
      dispatch(actGetDataTypesetting());
    }
  }, [statusTypeSetting]);

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
        <BreadCrumb title='Manage Setting' pageTitle='Dashboard' />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className='d-flex align-items-center'>
                  <h5 className='card-title mb-0 flex-grow-1'>Manage Setting</h5>
                  <div className='flex-shrink-0'>
                    <Can
                      yes={
                        <Button
                          color='success'
                          onClick={() =>
                            dispatch(
                              __openModal({
                                modal: 'MODAL_ADD_SETTING',
                                open: true,
                              })
                            )
                          }
                        >
                          <i className='ri-add-line align-bottom me-1' /> Create
                        </Button>
                      }
                      modul={'modul-setting|create'}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/**
                 * Init List Component
                 */}

                <Can
                  yes={<SettingList />}
                  modul={'modul-setting|read'}
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
