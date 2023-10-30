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
import Select from 'react-select';
import { optionsYesOrNo } from '../../Config/Utils';
import { actPostDataTypeuser } from '../../modules/Typeuser/Typeuser_act';

const FormAdd = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { FORM_ADD_TYPEUSER } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulTypeuser = useSelector((state) => state.modulTypeuser);
  const { status } = modulTypeuser;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      name: '',
      active: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      active: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      dispatch(actPostDataTypeuser(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;

  const handlerChange = (event, { name }) => {
    const { value, label } = event;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal isOpen={FORM_ADD_TYPEUSER}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Create type user</h5>
        </div>
        <ModalBody>
          {/* Field name */}
          <FormGroup>
            <Label>Name</Label>
            <Input name='name' onChange={validation.handleChange} defaultValue={values.name} />
            <FormText>{errors.name}</FormText>
          </FormGroup>
          {/* Field active */}
          <FormGroup>
            <Label>Activate</Label>
            <Select
              name='active'
              onChange={handlerChange}
              defaultValue={values.active}
              options={optionsYesOrNo}
            />
            <FormText>{errors.active}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'FORM_ADD_TYPEUSER', open: false }))}
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

export default FormAdd;
