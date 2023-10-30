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
// import { useFormInputValidation } from 'react-form-input-validation';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { optionsYesOrNo } from '../../Config/Utils';
import { actUpdateDataUser } from '../../modules/User/User_act';
const FormEdit = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_EDIT_USER, dataModal } = modals;
  const [optTypeuser, setOptTypeuser] = useState([]);

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulUser = useSelector((state) => state.modulUser);
  const { status } = modulUser;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      typeuser: '',
      profile: '',
      active: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      fullname: Yup.string().required(),
      typeuser: Yup.string().required(),
      profile: Yup.string(),
      active: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */
      const { id } = dataModal;
      dispatch(actUpdateDataUser({ ...values, id: id }));
    },
  });

  /**
   * Listen typeuser
   */

  const { dataTypeuser } = useSelector(({ modulTypeuser }) => ({
    dataTypeuser: modulTypeuser.data || [],
  }));

  useEffect(() => {
    let datas = [];
    if (dataTypeuser.length) {
      datas = dataTypeuser.map((item) => ({
        ...item,
        value: item._id,
        label: item.typeuser_name.toUpperCase(),
      }));
    }
    setOptTypeuser(datas);
  }, [dataTypeuser]);
  /**
   * Method used to submit form
   */

  const selected = (value, options = []) => {
    let select = options.filter((item) => item.value.toString() === value.toString());
    return select.length ? select[0] : { label: 'Please Select the option', value: '' };
  };

  const { errors, values, setValues } = validation;
  const handlerChange = (event, { name }) => {
    const { value, label } = event;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Object.keys(dataModal).length > 0) {
      setValues((prev) => ({
        ...prev,
        fullname: dataModal.user_fullname ? dataModal.user_fullname : prev.fullname,
        active: dataModal.is_active ? dataModal.is_active : prev.active,
        username: dataModal.user_username ? dataModal.user_username : prev.username,
        typeuser: dataModal.typeuser_id ? dataModal.typeuser_id : prev.typeuser,
      }));
    }
  }, [dataModal, setValues]);
  return (
    <Modal isOpen={MODAL_EDIT_USER}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Create User</h5>
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
          {/* Field fullname */}
          <FormGroup>
            <Label>Fullname</Label>
            <Input
              name='fullname'
              onChange={validation.handleChange}
              defaultValue={values.fullname}
            />
            <FormText>{errors.fullname}</FormText>
          </FormGroup>
          {/* Field typeuser */}
          <FormGroup>
            <Label>Type user</Label>
            <Select
              name='typeuser'
              onChange={handlerChange}
              defaultValue={values.typeuser}
              options={optTypeuser}
              value={selected(values.typeuser, optTypeuser)}
            />
            <FormText>{errors.typeuser}</FormText>
          </FormGroup>
          {/* Field profile */}
          <FormGroup>
            <Label>Profile</Label>
            <Input
              name='profile'
              onChange={validation.handleChange}
              defaultValue={values.profile}
            />
            <FormText>{errors.profile}</FormText>
          </FormGroup>
          {/* Field password */}
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
            onClick={() => dispatch(__openModal({ modal: 'MODAL_EDIT_USER', open: false }))}
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
