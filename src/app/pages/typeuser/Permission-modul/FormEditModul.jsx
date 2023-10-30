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
import { __openModal } from '../../../modules/Modal';
import { useFormInputValidation } from 'react-form-input-validation';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { optionsYesOrNo, selected } from '../../../Config/Utils';
import { actUpdatePermissionDataShema } from '../../../modules/Permission';

const FormEditModul = () => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial modals from reducer !!!
   */

  const [optModul, setOptModul] = useState([]);
  const { dataSchema, statusSchema, idPermission } = useSelector(({ modulSchema }) => ({
    dataSchema: modulSchema.data,
    statusSchema: modulSchema.status,
    idPermission: modulSchema.id,
  }));

  useEffect(() => {
    let datas = [];
    if (statusSchema === 'success') {
      datas = dataSchema.map((item) => ({
        ...item,
        value: item._id,
        label: item.modul_name.toUpperCase(),
      }));

      setOptModul(datas);
    }
  }, [statusSchema, dataSchema]);
  /**
   * Initial modulTypeuser form Reducer !!!
   */
  const modulPermissionSchema = useSelector((state) => state.modulPermissionSchema);
  const { status } = modulPermissionSchema;

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      modul: '',
      create: '0',
      read: '0',
      update: '0',
      delete: '0',
      id: '',
    },
    validationSchema: Yup.object({
      modul: Yup.string().required(),
      create: Yup.string().required(),
      read: Yup.string().required(),
      update: Yup.string().required(),
      delete: Yup.string().required(),
      id: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      /**
       * Method used to submit form
       */

      dispatch(actUpdatePermissionDataShema(values));
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

  const modals = useSelector((state) => state.modals);
  const { FORM_EDIT_PERMISSON_MODUL, dataModal } = modals;

  useEffect(() => {
    if (Object.keys(dataModal).length && FORM_EDIT_PERMISSON_MODUL) {
      setValues(() => ({
        modul: dataModal.modul_id || '0',
        create: dataModal.create || '0',
        read: dataModal.read || '0',
        update: dataModal.update || '0',
        delete: dataModal.delete || '0',
        id: dataModal._id || '',
        typeuser: dataModal.typeuser_id || '',
      }));
    } else {
    }
  }, [dataModal, FORM_EDIT_PERMISSON_MODUL]);

  return (
    <Modal isOpen={FORM_EDIT_PERMISSON_MODUL}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <div className='modal-header d-flex justify-content-between'>
          <h5 className='modal-title'>Update Permission Modul</h5>
        </div>
        <ModalBody>
          {/* Field modul */}
          <FormGroup>
            <Label>Modul</Label>
            <Select
              name='modul'
              onChange={handlerChange}
              defaultValue={values.modul}
              value={selected(values.modul, optModul)}
              options={optModul}
            />
            <FormText>{errors.modul}</FormText>
          </FormGroup>
          {/* Field create */}
          <FormGroup>
            <Label>Create</Label>
            <Select
              name='create'
              onChange={handlerChange}
              defaultValue={values.create}
              value={selected(values.create, optionsYesOrNo)}
              options={optionsYesOrNo}
            />
            <FormText>{errors.create}</FormText>
          </FormGroup>
          {/* Field read */}
          <FormGroup>
            <Label>Read</Label>
            <Select
              name='read'
              onChange={handlerChange}
              defaultValue={values.read}
              options={optionsYesOrNo}
              value={selected(values.read, optionsYesOrNo)}
            />
            <FormText>{errors.read}</FormText>
          </FormGroup>
          {/* Field update */}
          <FormGroup>
            <Label>Update</Label>
            <Select
              name='update'
              onChange={handlerChange}
              defaultValue={values.update}
              options={optionsYesOrNo}
              value={selected(values.update, optionsYesOrNo)}
            />
            <FormText>{errors.update}</FormText>
          </FormGroup>
          {/* Field delete */}
          <FormGroup>
            <Label>Delete</Label>
            <Select
              name='delete'
              onChange={handlerChange}
              defaultValue={values.delete}
              options={optionsYesOrNo}
              value={selected(values.delete, optionsYesOrNo)}
            />
            <FormText>{errors.delete}</FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          {/* Button close form  !!!*/}
          <Button
            color='warning'
            disabled={status === 'loading'}
            onClick={() =>
              dispatch(__openModal({ modal: 'FORM_EDIT_PERMISSON_MODUL', open: false }))
            }
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

export default FormEditModul;
