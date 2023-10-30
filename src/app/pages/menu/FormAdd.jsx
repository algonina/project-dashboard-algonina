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
import { actPostDataMenu } from '../../modules/Schema';
import { optionsYesOrNo, selected } from '../../Config/Utils';
const FormAdd = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_ADD_SCHEMA_MENU } = modals;

  const [optMenu, setOptMenu] = useState([]);
  const { dataMenus, statusMenus } = useSelector(({ modulMenu }) => ({
    dataMenus: modulMenu.data,
    statusMenus: modulMenu.status,
  }));

  useEffect(() => {
    let datas = [{ value: '0', label: 'No Parent' }];

    if (statusMenus === 'success' && dataMenus.length > 0) {
      dataMenus
        .filter((fil) => fil.menu_parent === '0')
        .map((item) => {
          return datas.push({ ...item, label: item.menu_name.toUpperCase(), value: item._id });
        });
    }

    setOptMenu(datas);
  }, [dataMenus, statusMenus]);
  /**
   * Initial modulTypeuser form Reducer !!!
   */

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      name: '',
      icon: '',
      link: '',
      parent: '',
      header: '0',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      icon: Yup.string().required(),
      link: Yup.string().required(),
      parent: Yup.string().required(),
      header: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */
      dispatch(actPostDataMenu(values));
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
    <Modal isOpen={MODAL_ADD_SCHEMA_MENU}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Create Menu</h5>
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
          {/* Field link */}
          <FormGroup>
            <Label>Link</Label>
            <Input name='link' onChange={validation.handleChange} defaultValue={values.link} />
            <FormText>{errors.link}</FormText>
          </FormGroup>
          {/* Field order */}

          <FormGroup>
            <Label>Header</Label>
            <Select
              name='header'
              onChange={handlerChange}
              defaultValue={values.header}
              options={optionsYesOrNo}
              value={selected(values.header, optionsYesOrNo)}
            />
            <FormText>{errors.active}</FormText>
          </FormGroup>
          {/* Field parent */}
          <FormGroup>
            <Label>Parent</Label>
            <Select
              options={optMenu}
              name='parent'
              onChange={handlerChange}
              defaultValue={values.type}
            />
            <FormText>{errors.parent}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={statusMenus === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_ADD_SCHEMA_MENU', open: false }))}
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={statusMenus === 'loading'}>
            {statusMenus !== 'loading' ? 'Create' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormAdd;
