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
import { useEffect } from 'react';
import { actUpdateDataCategory } from '../../modules/Room';
const FormEdit = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_EDIT_CATEGORY, dataModal } = modals;

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
      id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      icon: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */
      dispatch(actUpdateDataCategory(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;

  useEffect(() => {
    if (Object.keys(dataModal)) {
      setValues((prev) => ({
        name: dataModal.category_name,
        icon: dataModal.category_icon,
        id: dataModal._id,
      }));
    }
  }, [dataModal, setValues]);

  return (
    <Modal isOpen={MODAL_EDIT_CATEGORY}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Category</h5>
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
            onClick={() => dispatch(__openModal({ modal: 'MODAL_EDIT_CATEGORY', open: false }))}
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={status === 'loading'} type='submit'>
            {status !== 'loading' ? 'Update' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormEdit;
