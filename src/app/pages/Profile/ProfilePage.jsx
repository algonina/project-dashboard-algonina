import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import avatar1 from '../../../vendor/assets/images/users/avatar-1.jpg';
import FormUpdatePassword from './FormUpdatePassword';
import FormUpdateUsername from './FormUpdateUsername';
import { actPostDataMyaccount, actUpdateDataMyaccount } from '../../modules/Myaccount';
import { useFormik } from 'formik';

import * as Yup from 'yup';

const ProfilePage = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */

  const [data, setData] = useState({
    photo: '',
    fullname: '',
  });
  const dispatch = useDispatch();
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

  const { statusMyAccotunt } = useSelector(({ modulMyaccount }) => ({
    statusMyAccotunt: modulMyaccount.status,
  }));
  /**
   * Initial ModulTypeuser Reducer
   */
  const validation = useFormik({
    initialValues: {
      fullname: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */
      dispatch(actUpdateDataMyaccount(values));
    },
  });
  const { errors, values, setValues } = validation;

  useEffect(() => {
    if (Object.keys(dataProfile).length) {
      setData(dataProfile);
      setValues({
        fullname: dataProfile.fullname,
        username: dataProfile.username,
      });
    }
  }, [dataProfile]);

  const handleChangePhoto = (event) => {
    const { target } = event;
    const { files } = target;

    dispatch(actPostDataMyaccount({ file: files[0] }));
  };

  /**
   * Method used to submit form
   */

  return (
    <div className='page-content bg-white mb-0' style={{ minHeight: '100vh' }}>
      <FormUpdatePassword />
      <FormUpdateUsername />
      <Container fluid className=''>
        <BreadCrumb title='Page Title' pageTitle='Dashboard' />
        <Container className='py-4'>
          <h1 className='fw-bold'>Profile</h1>
          <p>Manage your profile, preferences, and account settings.</p>
          <Card className='border shadow-none mb-4'>
            <CardHeader className='fw-semibold fs-5'>Your profile</CardHeader>
            <CardBody>
              <div className='text-left d-flex justify-content-start align-items-center gap-2 mb-3'>
                <div className='profile-user p-1'>
                  <img
                    src={data.photo || avatar1}
                    className='rounded-circle bg-white avatar-lg img-thumbnail user-profile-image'
                    alt='user-profile'
                  />
                  <div className='avatar-xs p-0 rounded-circle profile-photo-edit'>
                    <Input
                      id='profile-img-file-input'
                      type='file'
                      className='profile-img-file-input'
                      onChange={handleChangePhoto}
                      accept='image/png, image/jpeg'
                    />
                    <Label
                      htmlFor='profile-img-file-input'
                      className='profile-photo-edit avatar-xs'
                    >
                      <span className='avatar-title rounded-circle bg-light text-body'>
                        <i className='ri-camera-fill'></i>
                      </span>
                    </Label>
                  </div>
                </div>
                <div className='p-1'>
                  <h5 className='mb-0'>Profile picture</h5>
                  <p className='mb-0'>Use a photo or image that is 132px square or larger.</p>
                </div>
              </div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                }}
              >
                <FormGroup>
                  <Label>Fullname</Label>
                  <Input
                    type='text'
                    name='fullname'
                    onChange={validation.handleChange}
                    defaultValue={values.fullname}
                  />
                  <FormText className=''>{errors.fullname}</FormText>
                </FormGroup>
                <FormGroup className='text-right'>
                  <Button size='md' type='submit' disabled={statusMyAccotunt === 'loading'}>
                    {statusMyAccotunt === 'loading' ? 'loading...' : 'Update'}
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          <Card className='shadow-none border'>
            <CardHeader className='fw-semibold fs-5'>Login detail</CardHeader>
            <CardBody>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='p-1'>
                  <h5 className='mb-2'>Email or Username</h5>
                  <p className='mb-0'>Update the email used to log into your account</p>
                </div>
                <div className='border'>
                  <Button
                    className='mb-0 shadow-none'
                    color='transparent'
                    onClick={() =>
                      dispatch(__openModal({ modal: 'MODAL_PROFILE_UPDATEUSERNAME', open: true }))
                    }
                  >
                    Update Username
                  </Button>
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='p-1'>
                  <h5 className='mb-2'>Update Password</h5>
                  <p className='mb-0'>Update a password to log into your account</p>
                </div>
                <div className='border'>
                  <Button
                    className='mb-0 shadow-none'
                    color='transparent'
                    onClick={() =>
                      dispatch(__openModal({ modal: 'MODAL_PROFILE_UPDATEPASSWORD', open: true }))
                    }
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </Container>
    </div>
  );
};

export default ProfilePage;
