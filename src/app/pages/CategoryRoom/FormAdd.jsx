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
import { actPostDataCategory } from '../../modules/Room';

const FormAdd = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_ADD_CATEGORY } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulCategoryRoom = useSelector((state) => state.modulCategoryRoom);
  const { status } = modulCategoryRoom;
  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      name: '',
      icon: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      icon: Yup.string().required(),
    }),
    onSubmit: (values) => {
      /**
       * Method used to submit form
       */
      dispatch(actPostDataCategory(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values } = validation;

  return (
    <Modal isOpen={MODAL_ADD_CATEGORY}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Create Category</h5>
        </div>
        <ModalBody>
          {/* Field name */}
          <FormGroup>
            <Label>Name</Label>
            <Input name='name' onChange={validation.handleChange} defaultValue={values.name} />
            <FormText>{errors.name}</FormText>
          </FormGroup>
          {/* Field icon */}
          <FormGroup>
            <Label>Icon</Label>
            <Input name='icon' onChange={validation.handleChange} defaultValue={values.icon} />
            <FormText>{errors.icon}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_ADD_CATEGORY', open: false }))}
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={status === 'loading'} type='submit'>
            {status !== 'loading' ? 'Create' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormAdd;
