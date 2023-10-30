import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from 'reactstrap';
import TableBsSas from '../../components/Table/TableBsSas';
import { Confirm } from '../../components/Confirm/Confirm';
import { actDeleteDataTypesetting } from '../../modules/Setting';
import { __openModal } from '../../modules/Modal';
import { convertDate } from '../../Helper/Date';
import Can from '../../components/Helper/Can';

const TypeSettingList = (props) => {
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
   * Initial modulTypeSetting form Reducer
   */
  const modulTypeSetting = useSelector((state) => state.modulTypeSetting);
  const { status, data } = modulTypeSetting;

  /**
   * Listen modulTypeSetting reducer
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
        return datas.push({
          ...items,
          no: i + 1,
          id: items._id,
          created: convertDate(items.created_at),
        });
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
          modul={'modul-type-setting|update'}
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
        />

        <Can
          modul={'modul-type-setting|delete'}
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

        {/* Button Delete */}
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
          onClick: () => dispatch(actDeleteDataTypesetting({ id: id })),
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
    return dispatch(__openModal({ modal: 'MODAL_EDIT_TYPESETTING', open: true, data: rows }));
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
      dataField: 'typesetting_name',
      text: 'Name',
      style: {
        width: '70%',
        textTransform: 'uppercase',
      },
    },
    {
      dataField: 'created',
      text: 'Datetime',
      style: {
        width: '10%',
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
    <TableBsSas
      dataColumn={columns}
      dataTable={rest}
      loading={status === 'loading'}
      tabelTitle='List Type Setting'
    />
  );
};

export default TypeSettingList;
