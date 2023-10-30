import React, { useEffect, useState } from 'react';
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
import { actUpdateDataMyaccount } from '../../modules/Myaccount';
const FormUpdateUsername = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_PROFILE_UPDATEUSERNAME } = modals;
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

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
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */
      dispatch(actUpdateDataMyaccount(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;
  useEffect(() => {
    if (Object.keys(dataProfile).length) {
      setValues({
        fullname: dataProfile.fullname,
        username: dataProfile.username,
      });
    }
  }, [dataProfile]);

  return (
    <Modal isOpen={MODAL_PROFILE_UPDATEUSERNAME}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Username</h5>
        </div>
        <ModalBody>
          {/* Field username */}
          <FormGroup>
            <Label>Username</Label>
            <Input
              name='username'
              onChange={validation.handleChange}
              defaultValue={values.username}
            />
            <FormText>{errors.username}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() =>
              dispatch(__openModal({ modal: 'MODAL_PROFILE_UPDATEUSERNAME', open: false }))
            }
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={status === 'loading'}>
            {status !== 'loading' ? 'Update' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormUpdateUsername;
