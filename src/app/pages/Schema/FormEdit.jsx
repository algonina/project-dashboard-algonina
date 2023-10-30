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
import { actUpdateDataSchema } from '../../modules/Schema';
const FormEdit = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_EDIT_SCHEMA, dataModal } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulSchema = useSelector((state) => state.modulSchema);
  const { status } = modulSchema;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      const { _id } = dataModal;
      return dispatch(actUpdateDataSchema({ ...values, id: _id }));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;

  useEffect(() => {
    if (Object.keys(dataModal).length && MODAL_EDIT_SCHEMA) {
      setValues((prev) => ({
        name: dataModal.modul_name ? dataModal.modul_name : prev.modul_name,
      }));
    } else {
      setValues(() => ({
        name: '',
      }));
    }
  }, [dataModal, MODAL_EDIT_SCHEMA, setValues]);

  return (
    <Modal isOpen={MODAL_EDIT_SCHEMA}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Modul</h5>
        </div>
        <ModalBody>
          {/* Field name */}
          <FormGroup>
            <Label>Name</Label>
            <Input name='name' onChange={validation.handleChange} defaultValue={values.name} />
            <FormText>{errors.name}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_EDIT_SCHEMA', open: false }))}
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

export default FormEdit;
