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
import Select, { components } from 'react-select';
import { actPostDataRoom } from '../../modules/Room';
import { useEffect } from 'react';

const FormAddRoom = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  const [optCategory, setOptCategory] = useState([]);

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_ADD_ROOM } = modals;

  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulRoom = useSelector((state) => state.modulRoom);
  const { status } = modulRoom;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      icon: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      description: Yup.string().required(),
      category: Yup.string().required(),
    }),
    onSubmit: (values) => {
      /**
       * Method used to submit form
       */
      dispatch(actPostDataRoom(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues } = validation;

  const { statusCategory, dataCategory } = useSelector(({ modulCategoryRoom }) => ({
    statusCategory: modulCategoryRoom.status,
    dataCategory: modulCategoryRoom.data,
  }));

  useEffect(() => {
    if (statusCategory === 'success') {
      let datas = dataCategory.map((item) => ({
        ...item,
        label: item.category_name,
        value: item._id,
      }));
      setOptCategory(datas);
    }
  }, [dataCategory, statusCategory]);

  const handlerChange = (event, { name }) => {
    const { value, label } = event;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div className='text-capitalize d-flex align-content-center gap-1 align-items-center px-2'>
          <span className={`${props.data.category_icon} mr-1`}></span>{' '}
          <Label className='m-0'> {props.data.category_name}</Label>
        </div>
      </components.DropdownIndicator>
    );
  };

  const ValueComponent = (props) => {
    return (
      <components.SingleValue {...props}>
        <div className='text-capitalize d-flex align-content-center gap-1 align-items-center'>
          <span className={`${props.data.category_icon} mr-1`}></span>{' '}
          <Label className='m-0'> {props.data.category_name}</Label>
        </div>
      </components.SingleValue>
    );
  };

  return (
    <Modal isOpen={MODAL_ADD_ROOM}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Create Room</h5>
        </div>
        <ModalBody>
          {/* Field title */}
          <FormGroup>
            <Label>Title</Label>
            <Input name='title' onChange={validation.handleChange} defaultValue={values.title} />
            <FormText>{errors.title}</FormText>
          </FormGroup>

          {/* Field category */}
          <FormGroup>
            <Label>Category</Label>
            <Select
              options={optCategory}
              onChange={handlerChange}
              name='category'
              components={{ Option: DropdownIndicator, SingleValue: ValueComponent }}
            />
            <FormText>{errors.category}</FormText>
          </FormGroup>
          {/* Field icon */}
          <FormGroup>
            <Label>Icon</Label>
            <Input name='icon' onChange={validation.handleChange} defaultValue={values.icon} />
            <FormText>{errors.icon}</FormText>
          </FormGroup>
          {/* Field description */}
          <FormGroup>
            <Label>Description</Label>
            <Input
              name='description'
              type='textarea'
              onChange={validation.handleChange}
              defaultValue={values.description}
            />
            <FormText>{errors.description}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_ADD_ROOM', open: false }))}
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={status === 'loading'} type='submit'>
            {status !== 'loading' ? 'Create' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormAddRoom;
