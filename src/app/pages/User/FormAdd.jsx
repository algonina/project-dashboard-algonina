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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { optionsYesOrNo } from '../../Config/Utils';
import Select from 'react-select';
import { actPostDataUser } from '../../modules/User/User_act';

const FormAdd = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();
  const [optTypeuser, setOptTypeuser] = useState([]);
  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_ADD_USER } = modals;

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
      password: '',
      password_confirmation: '',
      active: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      fullname: Yup.string().required(),
      typeuser: Yup.string().required(),
      profile: Yup.string(),
      active: Yup.string().required(),
      password: Yup.string()
        .required('Password is required')
        .min(6)
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.'),
      password_confirmation: Yup.string()
        .required('Password Confirmation')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      dispatch(actPostDataUser(values));
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

      setOptTypeuser(datas);
    }
  }, [dataTypeuser]);
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
    <Modal isOpen={MODAL_ADD_USER}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
        autoComplete='off'
        autoCorrect='off'
        autoFocus='off'
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
              autoComplete='unInput'
              role='presentation'
              autoCorrect='off'
              type='text'
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
              autoComplete='off'
            />
            <FormText>{errors.profile}</FormText>
          </FormGroup>
          {/* Field password */}
          <FormGroup>
            <Label>Password</Label>
            <Input
              name='password'
              onChange={validation.handleChange}
              defaultValue={values.password}
              type='password'
              autoComplete='off'
            />
            <FormText>{errors.password}</FormText>
          </FormGroup>
          {/* Field password_confirmation */}
          <FormGroup>
            <Label>Password confirmation</Label>
            <Input
              name='password_confirmation'
              onChange={validation.handleChange}
              defaultValue={values.password_confirmation}
              type='password'
              autoComplete='off'
            />
            <FormText>{errors.password_confirmation}</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Active</Label>
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
            onClick={() => dispatch(__openModal({ modal: 'MODAL_ADD_USER', open: false }))}
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
