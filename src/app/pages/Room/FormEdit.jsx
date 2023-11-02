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
import { useEffect } from 'react';
import Select, { components } from 'react-select';
import { selected } from '../../Config/Utils';
import { actUpdateDataRoom } from '../../modules/Room';

const FormEdit = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();
  const [optCategory, setOptCategory] = useState([]);

  /**
   * Initial modals from reducer !!!
   */
  const modals = useSelector((state) => state.modals);
  const { MODAL_EDIT_ROOM, dataModal } = modals;

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
      icon: '',
      category: '',
      id: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      description: Yup.string().required(),
      icon: Yup.string(),
      category: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      dispatch(actUpdateDataRoom(values));
    },
  });

  /**
   * Method used to submit form
   */

  const { errors, values, setValues, setErrors } = validation;

  useEffect(() => {
    if (!MODAL_EDIT_ROOM) {
      setValues((prev) => ({
        title: '',
        category: '',
        icon: '',
        id: '',
        description: '',
      }));
      setErrors({});
    }
  }, [MODAL_EDIT_ROOM]);

  useEffect(() => {
    if (Object.keys(dataModal).length) {
      setValues((prev) => ({
        title: dataModal.room_title,
        description: dataModal.room_description,
        category: dataModal.category_id,
        icon: dataModal.room_icon,
        id: dataModal._id,
      }));
    }
  }, [dataModal]);

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
    <Modal isOpen={MODAL_EDIT_ROOM}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Room</h5>
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
              value={selected(values.category, optCategory)}
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
              onChange={validation.handleChange}
              defaultValue={values.description}
              type='textarea'
            />
            <FormText>{errors.description}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() => dispatch(__openModal({ modal: 'MODAL_EDIT_ROOM', open: false }))}
          >
            Close
          </Button>
          {/* Button submit form */}
          <Button color='success' disabled={status === 'loading'} type='submit'>
            {status !== 'loading' ? 'Update' : 'loading...'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default FormEdit;
