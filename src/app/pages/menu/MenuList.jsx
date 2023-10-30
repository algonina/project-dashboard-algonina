import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Alert, Button, ListGroup, ListGroupItem } from 'reactstrap';
import TableBsSas from '../../components/Table/TableBsSas';
import { Confirm } from '../../components/Confirm/Confirm';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { __openModal } from '../../modules/Modal';
import { actDeleteDataMenu, actUpdateDataMenuStructur } from '../../modules/Schema';
import { DndProvider } from 'react-dnd';
import { MultiBackend, Tree, getBackendOptions } from '@minoru/react-dnd-treeview';
import { ThemeProvider } from 'styled-components';
import { themeThree } from './Theme';

import './style.scss';
import Can from '../../components/Helper/Can';

const MenuList = (props) => {
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();

  /**
   * Initial rest state
   * to accommodate data
   */
  const [rest, setRest] = useState([]);
  const [load, setLoad] = useState(true);

  /**
   * Initial modulMenu form Reducer
   */

  const { dataMenu, statusMenu } = useSelector(({ modulMenu }) => ({
    dataMenu: modulMenu.data,
    statusMenu: modulMenu.status,
  }));

  useEffect(() => {
    if (statusMenu === 'success') {
      setLoad(false);
    }
  }, [statusMenu]);
  /**
   * Listen modulMenu reducer
   */
  useEffect(() => {
    /**
     * Init datas assign array
     */
    let datas = [];

    /**
     * *Restructur data
     * *When status is success and data length more than 0
     */
    if (dataMenu.length > 0 && statusMenu === 'success') {
      /**
       * Set data to rest state
       */
      let childs = [];
      datas = dataMenu
        .filter((fill) => fill.menu_parent !== '')
        .map((item, i) => {
          return {
            ...item,
            class: 'nested-1',
            text: item.menu_name,
            id: item._id,
            droppable: true,
            parent: parseInt(item.menu_parent),
          };
        });
      setRest(datas);
    }
  }, [statusMenu, dataMenu]);

  const getChilds = (menus = [], parent = {}) => {
    let data = [];
    let i = 1;
    menus.map((it) => {
      if (parent._id.toString() === it.menu_parent.toString()) {
        data.push({
          ...it,
          text: it.menu_name,
          class: 'nested-2',
          id: it._id,
          parent: parseInt(it.menu_parent),
        });
        i++;
      }
      return data;
    });

    return data;
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
          onClick: () => dispatch(actDeleteDataMenu({ id: _id })),
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
    return dispatch(__openModal({ modal: 'MODAL_EDIT_SCHEMA_MENU', open: true, data: rows }));
  };

  const handleDrop = (newTreeData) => {
    const data = newTreeData.map((item) => ({
      _id: item._id,
      menu_parent: item.parent,
      name: item.menu_name,
    }));

    setRest(newTreeData);
    return dispatch(actUpdateDataMenuStructur(data));
  };

  return (
    <div>
      {!load ? (
        <div className=''>
          {rest.length < 1 ? <Alert color='danger'>Menu is empty</Alert> : ''}
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
              classes={{
                listItem: 'list-style-none col-item',
                root: 'tree',
              }}
              tree={rest}
              initialOpen={true}
              className='justify-content-between'
              rootId={0}
              onDrop={handleDrop}
              dropTargetOffset={10}
              canDrop={(tree, { dragSource, dropTargetId }) => {
                if (dragSource?.parent === dropTargetId) {
                  return true;
                }
              }}
              sort={false}
              render={(node, { depth, isOpen, onToggle }) => {
                return (
                  <div
                    className={`item-col d-flex align-items-center px-2 border justify-content-between" ${
                      isOpen ? 'text-primary' : ''
                    }`}
                  >
                    <h6
                      className={`title text-capitalize m-0 fs-14  ${isOpen ? 'text-primary' : ''}`}
                    >
                      {node.droppable && (
                        <span onClick={onToggle} className='mr-2 fs-4'>
                          {isOpen ? (
                            <i className='bx bx-chevron-down' />
                          ) : (
                            <i className='bx bx-chevron-up' />
                          )}
                        </span>
                      )}
                      {node.icon !== '' && node.parent === 0 ? (
                        <i className={`mr-1 ${node.menu_icon}`} />
                      ) : (
                        ''
                      )}
                      {node.text}
                    </h6>

                    <div className='border-0' style={{ border: 'none' }}>
                      <Can
                        yes={
                          <Button
                            size='sm'
                            className='btn-icon mr-2 text-white shadow-none border-0'
                            title='Edit'
                            onClick={() => onEditData(node)}
                            color='transparent '
                          >
                            <i className='bx bx-pencil' />
                          </Button>
                        }
                        modul={'menu|update'}
                      />

                      {/* Button Delete */}
                      <Can
                        yes={
                          <Button
                            size='sm'
                            title='Delete'
                            color='transparent '
                            onClick={() => onDeleteData(node)}
                            className='btn-icon shadow-none border-0'
                          >
                            <i className='bx bx-trash-alt' />
                          </Button>
                        }
                        modul={'menu|delete'}
                      />
                    </div>
                  </div>
                );
              }}
            />
          </DndProvider>
        </div>
      ) : (
        '...'
      )}
    </div>
  );
};

export default MenuList;
