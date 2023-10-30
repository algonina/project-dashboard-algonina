import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Badge, Button } from 'reactstrap';
import TableBsSas from '../../components/Table/TableBsSas';
import { Confirm } from '../../components/Confirm/Confirm';
import { __openModal } from '../../modules/Modal';
import { actDeleteDataTypeuser } from '../../modules/Typeuser';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Can from '../../components/Helper/Can';

const ListTypeuser = (props) => {
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
   * Initial modulTypeuser form Reducer
   */
  const modulTypeuser = useSelector((state) => state.modulTypeuser);
  const { status, data } = modulTypeuser;

  /**
   * Listen modulTypeuser reducer
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
    if ((data.length > 0 && status === 'success') || status === 'detail') {
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
      <div>
        {/* Button Update */}
        <Can
          yes={
            <Button
              size='sm'
              className='btn-edit mr-1'
              title='Edit'
              onClick={() => handleEdit(rows)}
            >
              <i className='bx bx-pencil' />
            </Button>
          }
          modul={'modul-user-type|update'}
        />

        {/* Button Delete */}
        <Can
          modul={'modul-user-type|delete'}
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
        />
      </div>
    );
  };

  /**
   * Method used to deleted data
   */
  const onDeleteData = (rows) => {
    const { _id } = rows;
    var confrimOption = {
      title: 'Delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(actDeleteDataTypeuser({ id: _id })),
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
    return dispatch(__openModal({ modal: 'MODAL_EDIT_TYPEUSER', open: true, data: rows }));
  };

  /**
   * Init column
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
      dataField: 'typeuser_name',
      text: 'Name',
      classes: 'text-info',
      style: {
        width: '45%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      formatter: (cellcontent, rows) => {
        return (
          <Link className='text-info' to={`/typeuser/${rows._id}`}>
            {cellcontent}
          </Link>
        );
      },
    },
    {
      dataField: 'is_active',
      text: 'Activate',
      style: {
        width: '40%',
        textTransform: 'uppercase',
      },
      formatter: (cellcontent) =>
        cellcontent === '1' ? <Badge color='success'>Yes</Badge> : <Badge color='danger'>No</Badge>,
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
    <TableBsSas
      dataColumn={columns}
      dataTable={rest}
      loading={status === 'loading'}
      tabelTitle='List Typeuser'
    />
  );
};

export default ListTypeuser;
