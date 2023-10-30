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
import Select from 'react-select';
import { optionsYesOrNo } from '../../Config/Utils';
import { actUpdateDataTypeuser } from '../../modules/Typeuser';

const FormEdit = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_EDIT_TYPEUSER, dataModal } = modals;

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
      return dispatch(actUpdateDataTypeuser({ ...values, id: dataModal._id }));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;

  useEffect(() => {
    if (Object.keys(dataModal).length > 0) {
      setValues((prev) => ({
        ...prev,
        name: dataModal.typeuser_name ? dataModal.typeuser_name : prev.name,
        active: dataModal.is_active ? dataModal.is_active : prev.active,
      }));
    }
  }, [dataModal, setValues]);

  const selected = (value, options = []) => {
    let select = options.filter((item) => item.value === value);

    return select.length ? select[0] : { label: 'Please Select the option', value: '' };
  };

  const handlerChange = (event, { name }) => {
    const { value, label } = event;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={MODAL_EDIT_TYPEUSER}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Edit type user</h5>
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
            <Label>Active</Label>
            <Select
              name='active'
              onChange={handlerChange}
              defaultValue={values.active}
              options={optionsYesOrNo}
              value={selected(values.active, optionsYesOrNo)}
            />
            <FormText>{errors.active}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_EDIT_TYPEUSER', open: false }))}
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

export default FormEdit;
