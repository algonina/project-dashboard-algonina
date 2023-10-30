import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Badge, Button } from 'reactstrap';
import TableBsSas from '../../../components/Table/TableBsSas';
import { Confirm } from '../../../components/Confirm/Confirm';
import { __openModal } from '../../../modules/Modal';
import FormAddModul from './FormAddModul';
import FormEditModul from './FormEditModul';
import { actDeletePermisionDataShema } from '../../../modules/Permission';
import Can from '../../../components/Helper/Can';

const ListModulPermission = (props) => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial rest state
   * to accommodate data
   */
  const [rest, setRest] = useState([]);

  /**
   * Initial modulModulPermission form Reducer
   */
  const modulModulPermission = useSelector((state) => state.modulPermissionSchema);
  const { status, data } = modulModulPermission;

  /**
   * Listen modulModulPermission reducer
   */
  useEffect(() => {
    /**
     * Init datas assign array
     */
    let datas = [];

    /**
     * Restructur data
     * When status is success and data length more than 0
     */
    if (data.length > 0 && status === 'success') {
      data.map((items, i) => {
        return datas.push({ ...items, no: i + 1, id: items._id });
      });
      /**
       * Set data to rest state
       */
      setRest(datas);
    }
  }, [status, data]);

  /**
   * Metode used render button delete and update
   */
  const Action = (cellcontent, rows, rowIndex, { handleEdit, handleDelete }) => {
    return (
      <div className='d-flex justify-content-center gap-2'>
        {/* Button Update */}
        <Can
          modul={'permission-modul|update'}
          yes={
            <Button size='sm' className='btn-edit' title='Edit' onClick={() => handleEdit(rows)}>
              <i className='bx bx-pencil' />
            </Button>
          }
        />

        {/* Button Delete */}
        <Can
          yes={
            <Button
              size='sm'
              color='danger'
              title='Delete'
              onClick={() => handleDelete(rows)}
              className='btn-delete'
            >
              <i className='bx bx-trash-alt' />
            </Button>
          }
          modul={'permission-modul|delete'}
        />
      </div>
    );
  };

  /**
   * Method used to deleted data
   */
  const onDeleteData = (rows) => {
    const { id, typeuser_id } = rows;
    var confrimOption = {
      title: 'Delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(actDeletePermisionDataShema({ id: id, typeuser: typeuser_id })),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    };

    return Confirm(confrimOption);
  };

  /**
   * Method used to open form edit data
   */
  const onEditData = (rows) => {
    return dispatch(__openModal({ modal: 'FORM_EDIT_PERMISSON_MODUL', open: true, data: rows }));
  };

  /**
   * Init column
   *
   */
  const columns = [
    {
      dataField: 'no',
      text: 'No',
      style: {
        width: '5%',
      },
    },
    {
      dataField: 'modul_name',
      text: 'Modul Name',
      style: {
        width: '30%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
    },
    {
      dataField: 'create',
      text: 'Create',
      style: {
        width: '10%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      formatter: (cellcontent) => {
        return cellcontent === '1' ? (
          <Badge color='success'>Yes</Badge>
        ) : (
          <Badge color='danger'>No</Badge>
        );
      },
    },
    {
      dataField: 'update',
      text: 'Update',
      style: {
        width: '10%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },

      formatter: (cellcontent) => {
        return cellcontent === '1' ? (
          <Badge color='success'>Yes</Badge>
        ) : (
          <Badge color='danger'>No</Badge>
        );
      },
    },
    {
      dataField: 'read',
      text: 'Read',
      style: {
        width: '10%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      formatter: (cellcontent) => {
        return cellcontent === '1' ? (
          <Badge color='success'>Yes</Badge>
        ) : (
          <Badge color='danger'>No</Badge>
        );
      },
    },
    {
      dataField: 'delete',
      text: 'Delete',
      style: {
        width: '10%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      formatter: (cellcontent) => {
        return cellcontent === '1' ? (
          <Badge color='success'>Yes</Badge>
        ) : (
          <Badge color='danger'>No</Badge>
        );
      },
    },
    {
      dataField: 'id',
      text: 'Action',
      formatter: Action,
      style: {
        width: '8%',
        textAlign: 'center',
      },
      formatExtraData: {
        handleDelete: onDeleteData,
        handleEdit: onEditData,
      },
    },
  ];
  return (
    <div>
      <FormAddModul />
      <FormEditModul />
      <div className='d-flex justify-content-end mb-3'>
        <Can
          modul={'permission-modul|create'}
          yes={
            <Button
              className='btn-action-icon'
              color='success'
              onClick={() =>
                dispatch(__openModal({ modal: 'FORM_ADD_PERMISSON_MODUL', open: true }))
              }
            >
              <i className='ri-add-line align-bottom me-1' /> Create
            </Button>
          }
        />
      </div>
      <TableBsSas
        dataColumn={columns}
        dataTable={rest}
        loading={status === 'loading'}
        tabelTitle='Manage Permission Modul'
      />
    </div>
  );
};

export default ListModulPermission;
