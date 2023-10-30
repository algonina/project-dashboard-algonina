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
import { optionsTypeInput, selected } from '../../Config/Utils';
import { actUpdateDataSetting } from '../../modules/Setting';
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
  const [optTypeSetting, setOptTypeSetting] = useState([]);

  const { dataTypeSetting } = useSelector(({ modulTypeSetting }) => ({
    dataTypeSetting: modulTypeSetting.data,
  }));

  useEffect(() => {
    let datas = [];
    if (dataTypeSetting.length) {
      datas = dataTypeSetting.map((item) => ({
        ...item,
        value: item._id,
        label: item.typesetting_name,
      }));
    }

    setOptTypeSetting(datas);
  }, [dataTypeSetting, setOptTypeSetting]);
  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulSetting = useSelector((state) => state.modulSetting);
  const { status } = modulSetting;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      name: '',
      type: '',
      value: '',
      options: '',
      typesetting: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      type: Yup.string().required(),
      value: Yup.string().required(),
      options: Yup.string(),
      typesetting: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      const { _id } = dataModal;
      return dispatch(actUpdateDataSetting({ id: _id, ...values }));
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

  useEffect(() => {
    if (Object.keys(dataModal).length && MODAL_EDIT_TYPEUSER) {
      setValues((prev) => ({
        ...prev,
        name: dataModal.setting_name || '',
        type: dataModal.setting_type || '',
        value: dataModal.setting_value || '',
        typesetting: dataModal.typesetting_id || '',
        options: dataModal.setting_options || '',
      }));
    }
  }, [dataModal, , MODAL_EDIT_TYPEUSER, setValues]);
  return (
    <Modal isOpen={MODAL_EDIT_TYPEUSER}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Setting</h5>
        </div>
        <ModalBody>
          {/* Field name */}
          <FormGroup>
            <Label>Name</Label>
            <Input name='name' onChange={validation.handleChange} defaultValue={values.name} />
            <FormText>{errors.name}</FormText>
          </FormGroup>
          {/* Field type */}
          <FormGroup>
            <Label>Type</Label>
            <Select
              options={optionsTypeInput}
              onChange={handlerChange}
              name='type'
              defaultValue={values.type}
              value={selected(values.type, optionsTypeInput)}
            />

            <FormText>{errors.type}</FormText>
          </FormGroup>
          {/* Field value */}
          <FormGroup>
            <Label>Value</Label>
            <Input name='value' onChange={validation.handleChange} defaultValue={values.value} />
            <FormText>{errors.value}</FormText>
          </FormGroup>
          {/* Field options */}
          <FormGroup>
            <Label>Options</Label>
            <Input
              name='options'
              onChange={validation.handleChange}
              defaultValue={values.options}
            />
            <FormText>{errors.options}</FormText>
          </FormGroup>
          {/* Field typesetting */}
          <FormGroup>
            <Label>Type setting</Label>

            <Select
              options={optTypeSetting}
              onChange={handlerChange}
              name='typesetting'
              defaultValue={values.typesetting}
              value={selected(values.typesetting, optTypeSetting)}
            />

            <FormText>{errors.typesetting}</FormText>
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
