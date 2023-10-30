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
import { optionsTypeInput } from '../../Config/Utils';
import { actGetDataSetting, actPostDataSetting } from '../../modules/Setting';
const FormAdd = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_ADD_SETTING } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulSetting = useSelector((state) => state.modulSetting);
  const { status } = modulSetting;

  const [optTypeSetting, setOptTypeSetting] = useState([]);
  const { dataTypeSetting } = useSelector(({ modulTypeSetting }) => ({
    dataTypeSetting: modulTypeSetting.data,
  }));

  useEffect(() => {
    let datas = [];
    if (dataTypeSetting.length > 0) {
      datas = dataTypeSetting.map((item) => ({
        ...item,
        value: item._id,
        label: item.typesetting_name,
      }));
    }

    setOptTypeSetting(datas);
  }, [dataTypeSetting]);
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

      dispatch(actPostDataSetting(values));
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
    <Modal isOpen={MODAL_ADD_SETTING}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Create Setting</h5>
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
              name='type'
              onChange={handlerChange}
              defaultValue={values.type}
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
              name='typesetting'
              onChange={handlerChange}
              defaultValue={values.typesetting}
            />
            <FormText>{errors.typesetting}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_ADD_SETTING', open: false }))}
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
