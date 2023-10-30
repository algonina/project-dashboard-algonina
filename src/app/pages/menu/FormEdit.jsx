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
import { optionsYesOrNo, selected } from '../../Config/Utils';
import { actUpdateDataMenu } from '../../modules/Schema';

const FormEdit = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_EDIT_SCHEMA_MENU, dataModal } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */

  const [optMenu, setOptMenu] = useState([]);
  const { dataMenus, statusMenus } = useSelector(({ modulMenu }) => ({
    dataMenus: modulMenu.data,
    statusMenus: modulMenu.status,
  }));

  /**

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      name: '',
      icon: '',
      link: '',
      order: '',
      parent: '',
      id: '',
      header: '',
      active: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      icon: Yup.string().required(),
      link: Yup.string().required(),
      order: Yup.string().required(),
      parent: Yup.string().required(),
      active: Yup.string().required(),
      header: Yup.string().required(),
      id: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      dispatch(actUpdateDataMenu(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;

  useEffect(() => {
    let datas = [{ value: '0', label: 'No Parent' }];
    if (MODAL_EDIT_SCHEMA_MENU && Object.keys(dataModal).length) {
      console.log(dataMenus);
      if (dataMenus.length > 0) {
        dataMenus
          .filter((fil) => fil.menu_parent === '0' && fil._id !== dataMenus._id)
          .map((item) => {
            return datas.push({
              ...item,
              label: item.menu_name.toUpperCase(),
              value: item._id.toString(),
            });
          });
      }

      setOptMenu(datas);

      setValues(() => ({
        name: dataModal.menu_name || '',
        icon: dataModal.menu_icon || '',
        parent: dataModal.menu_parent || '',
        link: dataModal.menu_link || '',
        order: dataModal.menu_order || '',
        id: dataModal._id || '',
        header: dataModal.menu_header || '0',
        active: dataModal.menu_active || '0',
      }));
    } else {
      setValues((prev) => ({
        name: '',
        icon: '',
        link: '',
        order: '',
        parent: '',
        id: '',
        header: '',
        active: '',
      }));
    }
  }, [MODAL_EDIT_SCHEMA_MENU, dataModal, dataMenus]);

  const handlerChange = (event, { name }) => {
    const { value, label } = event;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal isOpen={MODAL_EDIT_SCHEMA_MENU}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Edit Menu</h5>
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
              value={selected(values.parent, optMenu)}
              isDisabled={values.parent === '0'}
            />
            <FormText>{errors.parent}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={statusMenus === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_EDIT_SCHEMA_MENU', open: false }))}
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={statusMenus === 'loading'}>
            {statusMenus !== 'loading' ? 'Update' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormEdit;
