import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { __openModal } from '../../modules/Modal';
import { useFormInputValidation } from 'react-form-input-validation';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { actUpdateDataMyaccountPassword } from '../../modules/Myaccount';
const FormUpdatePassword = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_PROFILE_UPDATEPASSWORD } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulMyaccount = useSelector((state) => state.modulMyaccount);
  const { status } = modulMyaccount;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      password: '',
      repassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(),
      repassword: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */
      dispatch(actUpdateDataMyaccountPassword(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values } = validation;

  return (
    <Modal isOpen={MODAL_PROFILE_UPDATEPASSWORD}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Password</h5>
        </div>
        <ModalBody>
          {/* Field password */}
          <FormGroup>
            <Label>Password</Label>
            <Input
              name='password'
              onChange={validation.handleChange}
              defaultValue={values.password}
              type='password'
            />
            <FormText>{errors.password}</FormText>
          </FormGroup>
          {/* Field repassword */}
          <FormGroup>
            <Label>Repassword</Label>
            <Input
              name='repassword'
              onChange={validation.handleChange}
              defaultValue={values.repassword}
              type='password'
            />
            <FormText>{errors.repassword}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() =>
              dispatch(__openModal({ modal: 'MODAL_PROFILE_UPDATEPASSWORD', open: false }))
            }
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={status === 'loading'}>
            {status !== 'loading' ? 'Create' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormUpdatePassword;
