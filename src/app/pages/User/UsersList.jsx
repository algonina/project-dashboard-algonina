import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Badge, Button } from 'reactstrap';
import TableBsSas from '../../components/Table/TableBsSas';
import { Confirm } from '../../components/Confirm/Confirm';
import { actDeleteDataUser } from '../../modules/User/User_act';
import { __openModal } from '../../modules/Modal';
import TableSas from '../../components/Table/TableSas';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Can from '../../components/Helper/Can';

const UsersList = (props) => {
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
   * Initial modulUsers form Reducer
   */
  const modulUser = useSelector((state) => state.modulUser);
  const { status, data } = modulUser;

  /**
   * Listen modulUsers reducer
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
    }
    setRest(datas);
  }, [status, data]);

  /**
   * Metode used render button delete and update
   */
  const Action = (cellcontent, rows, rowIndex, { handleEdit, handleDelete }) => {
    return (
      <div>
        {/* Button Update */}
        <Can
          modul={'modul-user|update'}
          yes={
            <Button
              size='sm'
              className='btn-icon mr-2'
              title='Edit'
              onClick={() => handleEdit(rows)}
            >
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
              className='btn-icon'
            >
              <i className='bx bx-trash-alt' />
            </Button>
          }
          modul={'modul-user|update'}
        />
      </div>
    );
  };

  /**
   * Method used to deleted data
   */
  const onDeleteData = (rows) => {
    const { id } = rows;
    var confrimOption = {
      title: 'Delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(actDeleteDataUser({ id: id })),
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
    return dispatch(__openModal({ modal: 'MODAL_EDIT_USER', open: true, data: rows }));
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
      dataField: 'user_fullname',
      text: 'Fullname',
      style: {
        width: '40%',
      },
      formatter: (cellcontent, row) => (
        <div>
          <h6 className='fs-14 fw-bold text-uppercase'>{cellcontent}</h6>
          <span className='text-muted font-italic text-capitalize'>
            <em>
              -
              <Link className='text-muted text-href ml-1' to={`/typeuser/${row.typeuser_id}`}>
                {row.typeuser_name ? row.typeuser_name : ''}
              </Link>
            </em>
          </span>
        </div>
      ),
    },
    {
      dataField: 'user_username',
      text: 'Username',
      style: {
        width: '35%',
      },
    },
    {
      dataField: 'is_active',
      text: 'Activate',
      style: {
        width: '10%',
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
      dataTable={rest}
      dataColumn={columns}
      loading={status === 'loading'}
      tabelTitle='List Users'
    />
  );
};

export default UsersList;
