import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from 'reactstrap';
import TableBsSas from '../../components/Table/TableBsSas';
import { Confirm } from '../../components/Confirm/Confirm';
import { actDeleteDataCategory } from '../../modules/Room';
import { __openModal } from '../../modules/Modal';

const CategoriesList = (props) => {
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
   * Initial modulCategories form Reducer
   */
  const modulCategoryRoom = useSelector((state) => state.modulCategoryRoom);
  const { status, data } = modulCategoryRoom;

  /**
   * Listen modulCategories reducer
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
      <div>
        {/* Button Update */}
        <Button
          size='sm'
          className='btn-edit btn-icon mr-1'
          title='Edit'
          onClick={() => handleEdit(rows)}
        >
          <i className='bx bx-pencil' />
        </Button>

        {/* Button Delete */}
        <Button
          size='sm'
          color='danger'
          title='Delete'
          onClick={() => handleDelete(rows)}
          className='btn-delete'
        >
          <i className='bx bx-trash-alt' />
        </Button>
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
          onClick: () => dispatch(actDeleteDataCategory({ id: id })),
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
    return dispatch(__openModal({ modal: 'MODAL_EDIT_CATEGORY', open: true, data: rows }));
  };

  /**
   * Init column
   */
  const columns = [
    {
      dataField: 'no',
      text: 'No',
      style: {
        width: '50px',
      },
    },
    {
      dataField: 'category_icon',
      text: 'Icon',
      style: {
        width: '5%',
        textAlign: 'center',
      },
      formatter: (cellcontent) => <span className={`${cellcontent}`}></span>,
    },
    {
      dataField: 'category_name',
      text: 'Category',
      style: {
        width: '80%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
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
      tabelTitle='List Categories'
    />
  );
};

export default CategoriesList;
